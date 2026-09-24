(async function(){
 const $=id=>document.getElementById(id), v=$('demo-video'),t=RalloI18n.t;
 try {
  const response=await fetch('./tracking.json');if(!response.ok)throw new Error('Demo unavailable');
  const data=await response.json();
  const view=new RalloTracking.View({storageKey:'szkl-rallo-public-demo-v4',video:v,canvas:$('demo-overlay'),mapCanvas:$('demo-map'),playerSelect:$('demo-player-filter'),heatPanel:$('demo-heat-panel'),heatNote:$('demo-heat-note'),status:$('demo-status'),getJob:()=>data.job,toggles:{players:$('demo-players'),pose:$('demo-pose'),shuttle:$('demo-shuttle'),heatmap:$('demo-heat'),courtmap:{checked:true,disabled:false,addEventListener(){}}}});
  ['demo-players','demo-pose','demo-shuttle','demo-heat'].forEach(id=>$(id).checked=true);
  view.toggles.courtmap.checked=true;
  view.setData(data.tracking,t('真实追踪预览 · 二维估算。切换图层，对比观看。','Real tracking preview · 2D estimates. Toggle a layer to compare.'));
  const activate=()=>document.querySelectorAll('[data-rally]').forEach(b=>{const s=data.job.segments[+b.dataset.rally];const active=v.currentTime>=s.t_start&&v.currentTime<s.t_end;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('[data-rally]').forEach(b=>{b.disabled=false;b.onclick=()=>{v.currentTime=data.job.segments[+b.dataset.rally].t_start;v.play().catch(()=>{});};});
  v.addEventListener('timeupdate',activate);
  const initialFrame=()=>{v.currentTime=1.15;activate();};
  if(v.readyState>=1)initialFrame();else v.addEventListener('loadedmetadata',initialFrame,{once:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)v.pause();});
 }catch(error){$('demo-status').textContent=t('演示暂时无法加载，请刷新重试。','The demo could not load. Please refresh to try again.');}
})();
// Fit the same-origin marketing embed to its content on desktop and phones.
if(window.parent!==window){const reportSize=()=>window.parent.postMessage({type:'rallo-demo-height',height:Math.ceil(document.querySelector('main').getBoundingClientRect().height)},location.origin);new ResizeObserver(reportSize).observe(document.querySelector('main'));window.addEventListener('load',reportSize);reportSize();}
