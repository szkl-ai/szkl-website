/* Playback-only overlays. Source timestamps stay independent of cut timestamps. */
(function (root) {
  'use strict';
  const tr=(zh,en)=>root.RalloI18n?.t(zh,en)||en;
  const colours = ['#c5ed7b', '#77d8ff', '#efa2ff', '#ffd48b'];
  const W = 6.1, H = 13.4, NX = 31, NY = 67;

  function lowerBound(rows, t) {
    let lo = 0, hi = rows.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (rows[m][0] < t) lo = m + 1; else hi = m; }
    return lo;
  }
  function nearest(rows, t, tolerance = .16) {
    const i = lowerBound(rows, t), a = rows[i], b = rows[i - 1];
    const p = !a ? b : !b ? a : Math.abs(a[0] - t) < Math.abs(b[0] - t) ? a : b;
    return p && Math.abs(p[0] - t) <= tolerance ? p : null;
  }
  function skeletonAt(rows, links, t) {
    // A shorter tolerance than boxes avoids leaving limbs behind a fast stroke.
    // Keep missing joints missing; neither interpolation nor a nearby player's
    // anatomy can fill an occluded wrist, elbow or knee.
    const sample = nearest(rows, t, .10);
    if (!sample) return {points: [], links: []};
    const points = sample[1].map(p => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite) ? p : null);
    return {points, links: links.filter(([a, b]) => points[a] && points[b])};
  }
  function playerColour(pid, players, fallbackIndex) {
    const index = players.findIndex(p => p.id === pid);
    return colours[(index >= 0 ? index : fallbackIndex) % colours.length];
  }
  function drawSkeleton(ctx, skeleton, toScreen, colour) {
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    // Light, translucent strokes preserve the player's clothing and movement.
    ctx.globalAlpha = .55; ctx.strokeStyle = colour; ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (const [a, b] of skeleton.links) { ctx.moveTo(...toScreen(...skeleton.points[a])); ctx.lineTo(...toScreen(...skeleton.points[b])); }
    ctx.stroke();
    ctx.globalAlpha = .65;
    skeleton.points.forEach((p, i) => {
      if (!p) return;
      ctx.beginPath(); ctx.arc(...toScreen(...p), i < 5 ? .9 : 1.6, 0, Math.PI * 2);
      ctx.fillStyle = colour; ctx.fill();
    });
    ctx.restore();
  }
  function playRanges(segments) {
    const rows = segments.filter(s => s.include !== false).map(s =>
      [Math.max(s.t_start, s.play_start ?? s.t_start), Math.min(s.t_end, s.play_end ?? s.t_end)])
      .filter(([a, b]) => b > a).sort((a, b) => a[0] - b[0]);
    const out = [];
    for (const row of rows) {
      if (out.length && row[0] <= out[out.length - 1][1]) out[out.length - 1][1] = Math.max(out[out.length - 1][1], row[1]);
      else out.push(row.slice());
    }
    return out;
  }
  function activeRange(ranges, t) { return ranges.find(([a, b]) => a <= t && t < b); }
  function shuttleAt(paths, t, range, maxGap = .14) {
    if (!range) return null;
    let best = null;
    for (const path of paths) {
      if (!path.length || path[0][0] > t || path[path.length - 1][0] < t - .075) continue;
      // No future coordinates and no stale marker after detector loss.
      let i = lowerBound(path, t + .00001) - 1;
      if (i < 0 || t - path[i][0] > .075 || path[i][0] < range[0]) continue;
      const point = path[i], trail = [point];
      while (i > 0 && path[i - 1][0] >= Math.max(range[0], t - .65) && path[i][0] - path[i - 1][0] <= maxGap) {
        trail.unshift(path[--i]);
      }
      if (!best || Math.abs(t - point[0]) < Math.abs(t - best.point[0]) ||
          (point[0] === best.point[0] && point[3] > best.point[3])) best = {point, trail};
    }
    return best;
  }
  function project(matrix, x, y) {
    const d = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2];
    if (Math.abs(d) < 1e-8) return null;
    const p = [(matrix[0][0] * x + matrix[0][1] * y + matrix[0][2]) / d,
               (matrix[1][0] * x + matrix[1][1] * y + matrix[1][2]) / d];
    return p.every(Number.isFinite) ? p : null;
  }

  class Heatmap {
    constructor(feet) {
      this.rows = Object.entries(feet).flatMap(([pid, points]) => points.map(p => ({pid, p})))
        .sort((a, b) => a.p[0] - b.p[0]);
      this.key = null; this.reset();
    }
    reset() { this.bins = new Float64Array(NX * NY); this.next = 0; this.time = -Infinity; this.seconds = 0; this.samples = 0; }
    update(time, segments, pid = 'all') {
      const ranges = playRanges(segments), key = JSON.stringify([ranges, pid]);
      if (key !== this.key || time < this.time) { this.reset(); this.key = key; }
      this.time = time;
      while (this.next < this.rows.length && this.rows[this.next].p[0] <= time) {
        const row = this.rows[this.next++], [t, x, y, weight] = row.p;
        if ((pid !== 'all' && row.pid !== pid) || !activeRange(ranges, t) || !(weight > 0)) continue;
        const cx = Math.min(NX - 1, Math.floor(x / W * NX)), cy = Math.min(NY - 1, Math.floor(y / H * NY));
        if (cx < 0 || cy < 0 || x > W || y > H) continue;
        this.samples++; this.seconds += weight;
        // Small spatial kernel shows density without pretending to count steps.
        for (let iy = Math.max(0, cy - 2); iy <= Math.min(NY - 1, cy + 2); iy++) {
          for (let ix = Math.max(0, cx - 2); ix <= Math.min(NX - 1, cx + 2); ix++) {
            this.bins[iy * NX + ix] += weight * Math.exp(-((ix - cx) ** 2 + (iy - cy) ** 2) / 2);
          }
        }
      }
      return this;
    }
  }

  class LandingHeatmap extends Heatmap {
    constructor(events) {
      super({shuttle: events.filter(e => e.status === 'estimated' && e.court?.length === 2)
        .map(e => [e.t, e.court[0], e.court[1], 1])});
    }
    update(time) { return super.update(time, [{t_start:0, t_end:Number.MAX_VALUE}]); }
  }

  function groundAt(paths, t, maxGap = .14) {
    for (const path of paths) {
      const i = lowerBound(path, t + .00001)-1;
      if (i >= 0 && t-path[i][0] <= Math.min(.075, maxGap)) return {point:path[i], trail:[], grounded:true};
    }
    return null;
  }

  function playbackShuttle(shuttle, t) {
    const ground = groundAt(shuttle.ground_paths || [], t);
    const flight = shuttleAt(shuttle.paths || [], t, [0,Infinity], shuttle.max_gap_s);
    // An old shuttle left on the floor must not hide the next active shuttle.
    return ground && (!flight || Math.hypot(ground.point[1]-flight.point[1], ground.point[2]-flight.point[2]) < 12)
      ? ground : flight;
  }

  function heatColour(value, peak, alpha = 1) {
    const n = Math.sqrt(value / peak);
    return `hsla(${210 - 210 * n},95%,${48 + 10 * n}%,${alpha * Math.min(.85, .2 + n * .65)})`;
  }
  function canvasSize(canvas, width, height) {
    const ratio = Math.min(2, root.devicePixelRatio || 1);
    const w = Math.max(1, Math.round(width * ratio)), h = Math.max(1, Math.round(height * ratio));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ctx = canvas.getContext('2d'); ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height); return ctx;
  }
  function courtLines(ctx, point) {
    function line(x1, y1, x2, y2) {
      const a = point(x1, y1), b = point(x2, y2); if (!a || !b) return;
      ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1;
    for (const x of [0, .46, W - .46, W]) line(x, 0, x, H);
    for (const y of [0, .76, 4.72, 8.68, H - .76, H]) line(0, y, W, y);
    line(W / 2, 0, W / 2, 4.72); line(W / 2, 8.68, W / 2, H);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; line(0, H / 2, W, H / 2);
  }
  function heatCells(ctx, bins, point, alpha = 1) {
    const peak = Math.max(...bins);
    if (!peak) return;
    for (let y = 0; y < NY; y++) for (let x = 0; x < NX; x++) {
      const value = bins[y * NX + x]; if (value < peak * .015) continue;
      const ps = [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]].map(([a, b]) => point(a * W / NX, b * H / NY));
      if (ps.some(p => !p)) continue;
      ctx.fillStyle = heatColour(value, peak, alpha); ctx.beginPath(); ctx.moveTo(...ps[0]);
      ps.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath(); ctx.fill();
    }
  }

  class View {
    constructor(options) {
      Object.assign(this, options); this.data = null; this.heat = null; this.mapKey = ''; this.playerKey = '';
      this.storageKey = options.storageKey || 'rallo-playback-overlays-v1';
      let preferences = {};
      try { preferences = JSON.parse(root.localStorage.getItem(this.storageKey) || '{}'); } catch (_) {}
      Object.entries(this.toggles).forEach(([key, input]) => {
        if (typeof preferences[key] === 'boolean') input.checked = preferences[key];
        input.addEventListener('change', () => {
          try {
            const saved = JSON.parse(root.localStorage.getItem(this.storageKey) || '{}');
            root.localStorage.setItem(this.storageKey, JSON.stringify({...saved, ...Object.fromEntries(Object.entries(this.toggles).map(([k, el]) => [k, el.checked]))}));
          } catch (_) {}
          this.draw();
        });
      });
      this.playerSelect.addEventListener('change', () => { this.mapKey = ''; this.draw(); });
      this.mapSelect?.addEventListener('change', () => { this.mapKey = ''; this.draw(); });
      for (const event of ['timeupdate', 'seeked', 'loadedmetadata']) this.video.addEventListener(event, () => this.draw());
      const resize = new ResizeObserver(() => { this.mapKey = ''; this.draw(); });
      resize.observe(this.video); resize.observe(this.mapCanvas);
      if (this.video.requestVideoFrameCallback) {
        const frame = () => { this.draw(); this.video.requestVideoFrameCallback(frame); };
        this.video.requestVideoFrameCallback(frame);
      }
      this.setData(null, 'Tracking views load after analysis.');
    }
    setData(data, message = '') {
      this.data = data; this.heat = data ? new Heatmap(data.feet || {}) : null; this.mapKey = ''; this.playerKey = '';
      this.landingHeat = data ? new LandingHeatmap(data.shuttle?.landings || []) : null;
      this.heatMessage = data ? 'No foot positions available. Analyze the players after calibrating the court.' : message || 'Loading foot positions…';
      const available = {players: !!Object.values(data?.players || {}).some(a => a.length),
        pose: !!Object.values(data?.pose?.players || {}).some(rows => rows.some(row => row[1].some(Boolean))),
        shuttle: !!(data?.shuttle?.paths?.length || data?.shuttle?.ground_paths?.length), heatmap: !!this.heat?.rows.length, courtmap: true};
      for (const [key, input] of Object.entries(this.toggles)) input.disabled = !available[key];
      const missing = [];
      if (data && !available.shuttle) missing.push('No reliable shuttle trail is available for this video.');
      if (data && !available.heatmap) missing.push('Footstep heatmap needs visible ankles and a calibrated court.');
      if (data && !available.pose) missing.push('Body joints are unavailable. Analyze this video to create pose tracking.');
      this.status.textContent = message || missing.join(' ') || (data?.shuttle?.scope === 'selected-court'
        ? 'Shuttle: focused court only; uncertain flights are hidden. Tracking views are 2D estimates.'
        : 'Joints and shuttle trails are 2D estimates; hidden points may disappear. View toggles do not change downloads.');
      this.draw();
    }
    drawMap(t) {
      const width = this.mapCanvas.getBoundingClientRect().width, height = width * H / W;
      if (!width) return;
      const landingMode = this.mapSelect?.value === 'landings', heat = landingMode ? this.landingHeat : this.heat;
      const mapKey = JSON.stringify([landingMode, heat?.key, heat?.next, width]);
      if (mapKey !== this.mapKey) {
        this.mapKey = mapKey;
        const map = canvasSize(this.mapCanvas, width, height);
        map.fillStyle = '#123b38'; map.fillRect(0, 0, width, height);
        const point = (x, y) => [8 + x / W * (width - 16), 8 + (H - y) / H * (height - 16)];
        if (heat) heatCells(map, heat.bins, point);
        courtLines(map, point);
      }
      if (this.mapExplanation) this.mapExplanation.textContent = landingMode
        ? 'One count per estimated landing on this court across the source video. Unseen or uncertain landings are omitted.'
        : 'Estimated foot positions during selected play. Waiting between rallies is excluded.';
      if (this.legendLow) this.legendLow.textContent = landingMode ? 'Fewer' : 'Less time';
      if (this.legendHigh) this.legendHigh.textContent = landingMode ? 'More landings' : 'More time';
      if (landingMode) {
        this.heatNote.textContent = heat?.rows.length
          ? `${heat.samples} estimated landing${heat.samples === 1 ? '' : 's'} up to ${root.fmtTime(t)} · near baseline at the bottom`
          : 'No reliable floor stops detected. Missing or off-screen landings are not guessed.';
        return;
      }
      this.heatNote.textContent = !this.heat?.rows.length ? this.heatMessage : this.heat.samples
        ? tr('截至 '+root.fmtTime(t)+' 的回合移动 · 下方为近端底线', 'Selected play up to '+root.fmtTime(t)+' · near baseline at the bottom')
        : tr('尚无回合移动数据，播放回合即可查看。','No selected play samples yet. Seek into a rally to see movement.');
    }
    draw() {
      const showHeat = this.toggles.heatmap.checked && !this.toggles.heatmap.disabled;
      const showMap = this.toggles.courtmap ? this.toggles.courtmap.checked : showHeat;
      this.heatPanel.hidden = !showMap;
      const t = this.video.currentTime || 0;
      const landingMode = this.mapSelect?.value === 'landings';
      if (this.playerFilter) this.playerFilter.hidden = landingMode;
      const segments = this.getJob()?.segments || [], players = this.getJob()?.players?.players || [];
      const key = JSON.stringify(players.map(p => [p.id, p.name, p.slot]));
      if (key !== this.playerKey) {
        this.playerKey = key; const selected = this.playerSelect.value;
        this.playerSelect.replaceChildren(new Option(tr('全部球员','All players'), 'all'));
        players.filter(p => this.data?.feet?.[p.id]?.length).forEach(p => this.playerSelect.add(new Option(p.name || p.slot || p.id, p.id)));
        if ([...this.playerSelect.options].some(o => o.value === selected)) this.playerSelect.value = selected;
      }
      this.playerSelect.disabled = !this.heat?.rows.length;
      if (showHeat || (showMap && !landingMode)) this.heat?.update(t, segments, this.playerSelect.value);
      if (showMap && landingMode) this.landingHeat?.update(t);
      if (showMap) this.drawMap(t);
      // The court map can render before the video metadata has loaded.
      const rect = this.video.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const ctx = canvasSize(this.canvas, rect.width, rect.height);
      if (!this.data?.frame || !this.video.videoWidth) return;
      const fw = this.data.frame.w, fh = this.data.frame.h, scale = Math.min(rect.width / fw, rect.height / fh);
      const ox = (rect.width - fw * scale) / 2, oy = (rect.height - fh * scale) / 2;
      const toScreen = (x, y) => [ox + x * scale, oy + y * scale];
      if (showHeat) {
        const transforms = this.data.court?.transforms || [];
        let ci = transforms.length - 1; while (ci >= 0 && transforms[ci].t > t) ci--;
        ctx.save(); ctx.beginPath(); ctx.rect(ox, oy, fw * scale, fh * scale); ctx.clip();
        if (ci >= 0) heatCells(ctx, this.heat.bins, (x, y) => { const p = project(transforms[ci].matrix, x, y); return p ? toScreen(...p) : null; }, .6);
        ctx.restore();
      }
      if (this.toggles.players.checked && !this.toggles.players.disabled) {
        ctx.save();
        Object.entries(this.data.players).forEach(([pid, boxes], i) => {
          const b = nearest(boxes, t); if (!b) return;
          const player = players.find(p => p.id === pid), colour = playerColour(pid, players, i);
          const name = player?.name || player?.slot || pid, [x, y] = toScreen(b[1], b[2]);
          ctx.globalAlpha = .55; ctx.strokeStyle = colour; ctx.lineWidth = 1;
          ctx.strokeRect(x, y, (b[3] - b[1]) * scale, (b[4] - b[2]) * scale);
          ctx.globalAlpha = .7; ctx.font = '600 12px sans-serif';
          ctx.fillStyle = colour; ctx.fillText(name, x + 2, Math.max(oy + 12, y - 5));
        });
        ctx.restore();
      }
      if (this.toggles.pose?.checked && !this.toggles.pose.disabled) {
        ctx.save(); ctx.beginPath(); ctx.rect(ox, oy, fw * scale, fh * scale); ctx.clip();
        Object.entries(this.data.pose.players).forEach(([pid, rows], i) => {
          drawSkeleton(ctx, skeletonAt(rows, this.data.pose.links, t), toScreen, playerColour(pid, players, i));
        });
        ctx.restore();
      }
      if (this.toggles.shuttle.checked && !this.toggles.shuttle.disabled) {
        // Source tracking continues outside export selections and after a rally.
        // Missing positions remain blank; never draw a line through an occlusion.
        const observation = playbackShuttle(this.data.shuttle, t);
        if (observation) {
          const {point, trail} = observation;
          for (let i = 1; i < trail.length; i++) {
            ctx.strokeStyle = `rgba(255,218,74,${.2 + .8 * i / trail.length})`; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(...toScreen(trail[i - 1][1], trail[i - 1][2])); ctx.lineTo(...toScreen(trail[i][1], trail[i][2])); ctx.stroke();
          }
          const [x, y] = toScreen(point[1], point[2]);
          ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.strokeStyle = '#101619'; ctx.lineWidth = 5; ctx.stroke();
          ctx.strokeStyle = observation.grounded ? '#79f2d0' : '#ffda4a'; ctx.lineWidth = 2.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
          if (observation.grounded) { ctx.font = '11px sans-serif'; ctx.fillStyle = '#79f2d0'; ctx.fillText(tr('落地 · 估算','Ground · estimated'), x+9, y-8); }
        }
      }
    }
  }
  const api = {lowerBound, nearest, skeletonAt, playerColour, playRanges, activeRange, shuttleAt, groundAt, playbackShuttle, project, Heatmap, LandingHeatmap, View};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RalloTracking = api;
})(typeof window !== 'undefined' ? window : globalThis);
