import {useEffect, useRef, type RefObject} from 'react';
import './group-motion.css';

const REVEALS = [
  '[data-reveal]', '.g-hero-kicker', '.g-hero h1', '.g-hero-copy > p',
  '.g-system', '.g-section-head', '.g-phase', '.g-loop-note', '.g-thesis',
  '.g-shifts > article', '.g-local', '.g-person', '.g-project', '.g-visual',
  '.g-lab figcaption', '.g-contact > .g-wrap > div',
].join(',');
const INTERACTIVE = 'a[href],button,input,select,textarea,summary,video[controls],audio[controls],[tabindex],[contenteditable="true"]';

/** Mount once on the group-page wrapper. CSS and DOM remain visible without JS.
 * data-reveal opts editorial blocks in; data-motion="off" opts a subtree out.
 * Only .g-visual-image[data-parallax] inside .g-visual receives image depth.
 * Interactive cards settle without fading, so controls never become invisible.
 */
export function useGroupMotion(providedRef?: RefObject<HTMLDivElement>) {
  const ownRef = useRef<HTMLDivElement>(null);
  const rootRef = providedRef ?? ownRef;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !root.matches('.group-site')) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const targets = Array.from(root.querySelectorAll<HTMLElement>(REVEALS))
      .filter(el => !el.closest('[data-motion="off"]'));
    // Do not animate both a selected ancestor and its descendants.
    const blocks = targets.filter(el => !targets.some(parent => parent !== el && parent.contains(el)));
    const images = Array.from(root.querySelectorAll<HTMLElement>('.g-visual .g-visual-image[data-parallax]'))
      .filter(el => !el.closest('[data-motion="off"]'));
    const nearImages = new Set<HTMLElement>();
    let revealObserver: IntersectionObserver | undefined;
    let depthObserver: IntersectionObserver | undefined;
    let frame = 0;
    let disposed = false;

    const reveal = (el: HTMLElement, immediate = false) => {
      if (immediate) {
        el.dataset.gInstant = '';
        delete el.dataset.gEntrance;
      }
      el.dataset.gReveal = 'visible';
      revealObserver?.unobserve(el);
    };
    const revealAll = () => blocks.forEach(el => reveal(el, true));
    const revealAround = (node: Element | null) => {
      if (!node || !root.contains(node)) return;
      for (const el of blocks) {
        if (el === node || el.contains(node) || node.contains(el)) reveal(el, true);
      }
    };
    const hashTarget = (hash: string) => {
      let id = hash.replace(/^#/, '');
      try { id = decodeURIComponent(id); } catch { return; }
      const aliases: Record<string, string> = {applications:'projects', approach:'technology', compute:'understanding', act:'action', labpilot:'phenolab', 'pheno-operations':'pulse'};
      // getElementById avoids interpreting arbitrary hash text as a CSS selector.
      const node = document.getElementById(aliases[id] ?? id);
      if (node && root.contains(node)) revealAround(node.closest('section') ?? node);
    };
    const onHash = () => hashTarget(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const node = event.target;
      if (!(node instanceof Element)) return;
      const anchor = node.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search && url.hash) hashTarget(url.hash);
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) revealAround(event.target);
    };
    const onKey = (event: KeyboardEvent) => {
      // A tab into any part of the page should never encounter delayed content.
      if (event.key === 'Tab') revealAll();
    };
    const clearDepth = () => images.forEach(el => {
      el.style.removeProperty('--g-depth-y');
      delete el.dataset.gDepth;
    });
    const updateDepth = () => {
      frame = 0;
      if (disposed || reduced.matches || compact.matches || document.hidden) return;
      const height = window.innerHeight;
      const positions = Array.from(nearImages, el => ({el, rect: el.closest('.g-visual')!.getBoundingClientRect()}));
      for (const {el, rect} of positions) {
        const progress = Math.max(-1, Math.min(1, (height / 2 - rect.top - rect.height / 2) / ((height + rect.height) / 2)));
        // The scale's overscan always exceeds the translation. No exposed edges.
        const distance = Math.min(12, el.offsetHeight * 0.014);
        el.style.setProperty('--g-depth-y', `${(progress * distance).toFixed(2)}px`);
        el.dataset.gDepth = '';
      }
    };
    const queueDepth = () => {
      if (!frame && !reduced.matches && !compact.matches && nearImages.size && !document.hidden) frame = requestAnimationFrame(updateDepth);
    };
    const stop = () => {
      revealObserver?.disconnect();
      depthObserver?.disconnect();
      nearImages.clear();
      cancelAnimationFrame(frame);
      frame = 0;
      clearDepth();
    };
    const start = () => {
      stop();
      const canObserve = typeof IntersectionObserver !== 'undefined';
      root.dataset.gMotion = reduced.matches || !canObserve ? 'reduced' : 'active';
      if (reduced.matches || !canObserve) { revealAll(); return; }
      revealObserver = new IntersectionObserver(entries => {
        let index = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty('--g-reveal-delay', `${compact.matches ? 0 : Math.min(index++, 3) * 55}ms`);
          reveal(el);
        }
      }, {rootMargin:'0px 0px -24px 0px', threshold:0});
      blocks.filter(el => el.dataset.gReveal === 'waiting').forEach(el => revealObserver!.observe(el));
      if (!compact.matches && images.length) {
        depthObserver = new IntersectionObserver(entries => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) nearImages.add(el);
            else nearImages.delete(el);
          }
          queueDepth();
        }, {rootMargin:'120px 0px'});
        images.forEach(el => depthObserver!.observe(el));
      }
    };

    for (const el of blocks) {
      const interactive = el.matches(INTERACTIVE) || el.querySelector(INTERACTIVE) || el.closest(INTERACTIVE);
      el.dataset.gKind = interactive ? 'settle' : 'reveal';
      const rect = el.getBoundingClientRect();
      const offscreen = rect.top >= window.innerHeight;
      el.dataset.gReveal = !reduced.matches && offscreen ? 'waiting' : 'visible';
      if (!reduced.matches && !offscreen && rect.bottom > 0 && el.closest('.g-hero') && !window.location.hash) {
        el.dataset.gEntrance = '';
        el.style.setProperty('--g-reveal-delay', `${Math.min(blocks.indexOf(el), 3) * 55}ms`);
      }
    }
    root.addEventListener('focusin', onFocus);
    root.addEventListener('click', onClick, true);
    root.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('scroll', queueDepth, {passive:true});
    window.addEventListener('resize', queueDepth, {passive:true});
    document.addEventListener('visibilitychange', queueDepth);
    reduced.addEventListener('change', start);
    compact.addEventListener('change', start);
    start();
    onHash();
    const application = new URLSearchParams(location.search).get('application');
    if (application) hashTarget(application);
    if (document.activeElement instanceof Element) revealAround(document.activeElement);

    return () => {
      disposed = true;
      stop();
      root.removeEventListener('focusin', onFocus);
      root.removeEventListener('click', onClick, true);
      root.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('scroll', queueDepth);
      window.removeEventListener('resize', queueDepth);
      document.removeEventListener('visibilitychange', queueDepth);
      reduced.removeEventListener('change', start);
      compact.removeEventListener('change', start);
      delete root.dataset.gMotion;
      for (const el of blocks) {
        delete el.dataset.gReveal;
        delete el.dataset.gKind;
        delete el.dataset.gInstant;
        delete el.dataset.gEntrance;
        el.style.removeProperty('--g-reveal-delay');
      }
    };
  }, [rootRef]);

  return rootRef;
}
