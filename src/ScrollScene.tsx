import {useEffect, useRef} from 'react';
import type {Lang} from './content';
import './scroll-scene.css';

const scenes = {
 motion: {
  secondary: 'motion-2', background: 'motion-3',
  title: {en: 'Movement, seen from more than one angle.', zh: '从不同视角，看见运动。'},
  caption: {en: 'From a movement to a trace. From a trace to context.', zh: '从动作到轨迹，从轨迹到上下文。'},
  primaryAlt: {en: 'Human movement concept with pose landmarks and vector trajectories in a camera-equipped studio.', zh: '人体运动概念图：配备相机的工作室中，人物叠加姿态关键点与向量轨迹。'},
  secondaryAlt: {en: 'Object-tracking concept with component trajectories, spatial coordinates and robotic handling.', zh: '物体追踪概念图：零件轨迹、空间坐标与机械取放相互关联。'},
 },
 workspace: {
  secondary: 'workspace-3', background: 'workspace-1',
  title: {en: 'Ideas take shape in the same space.', zh: '让想法，在同一空间成形。'},
  caption: {en: 'A shared setting for hardware, software and experimentation.', zh: '让硬件、软件与实验，在同一场景中协作。'},
  primaryAlt: {en: 'Conceptual SZKL workspace bringing experimental hardware and collaborative work into one environment.', zh: 'SZKL 工作空间概念图：将实验硬件与协作工作汇聚于同一环境。'},
  secondaryAlt: {en: 'Alternate architectural study of a shared workspace for engineering and experimentation.', zh: '共享工程与实验工作空间的另一建筑概念视角。'},
 },
};

/** Independent scroll geometry; never participates in useGroupMotion selectors. */
export default function ScrollScene({kind, lang}: {kind: 'motion' | 'workspace'; lang: Lang}) {
 const ref = useRef<HTMLElement>(null);
 const scene = scenes[kind];
 useEffect(() => {
  const root = ref.current;
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  let frame = 0;
  let disposed = false;
  let hashStatic = false;
  const update = () => {
   frame = 0;
   if (disposed) return;
   const staticScene = reduced.matches || hashStatic || root.contains(document.activeElement);
   root.dataset.sceneStatic = String(staticScene);
   const rect = root.getBoundingClientRect();
   const viewport = window.innerHeight;
   const progress = staticScene ? .5 : Math.max(0, Math.min(1, mobile.matches
    ? (viewport - rect.top) / (viewport + rect.height)
    : (100 - rect.top) / Math.max(1, rect.height - viewport * .8)));
   root.dataset.sceneProgress = progress.toFixed(4);
   const p = progress - .5;
   root.style.setProperty('--scene-primary-y', `${p * (mobile.matches ? -12 : -42)}px`);
   root.style.setProperty('--scene-primary-scale', `${1 + p * (mobile.matches ? .015 : .06)}`);
   root.style.setProperty('--scene-secondary-x', `${p * (mobile.matches ? -18 : -180)}px`);
   root.style.setProperty('--scene-secondary-y', `${p * (mobile.matches ? -24 : -190)}px`);
   root.style.setProperty('--scene-secondary-rotate', `${p * (mobile.matches ? 0 : -6)}deg`);
   root.style.setProperty('--scene-background-y', `${p * (mobile.matches ? 14 : 95)}px`);
  };
  // All scroll / resize / observer work shares this one frame, with no React renders.
  const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(update); };
  const instant = () => { cancelAnimationFrame(frame); frame = 0; update(); };
  const onHash = () => {
   let id = location.hash.slice(1);
   try { id = decodeURIComponent(id); } catch { /* Invalid hashes have no scene target. */ }
   const target = id ? document.getElementById(id) : null;
   hashStatic = !!target && (root.contains(target) || target.contains(root));
   instant();
  };
  const resume = () => { if (hashStatic) { hashStatic = false; schedule(); } };
  const onScrollKey = (event: KeyboardEvent) => {
   if (event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
   if (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
   if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) resume();
  };
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
  observer?.observe(root);
  root.addEventListener('focusin', instant);
  root.addEventListener('focusout', schedule);
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  window.addEventListener('hashchange', onHash);
  window.addEventListener('pageshow', onHash);
  window.addEventListener('wheel', resume, {passive: true});
  window.addEventListener('touchstart', resume, {passive: true});
  window.addEventListener('keydown', onScrollKey);
  reduced.addEventListener('change', instant);
  mobile.addEventListener('change', instant);
  onHash();
  return () => {
   disposed = true;
   cancelAnimationFrame(frame);
   observer?.disconnect();
   root.removeEventListener('focusin', instant);
   root.removeEventListener('focusout', schedule);
   window.removeEventListener('scroll', schedule);
   window.removeEventListener('resize', schedule);
   window.removeEventListener('hashchange', onHash);
   window.removeEventListener('pageshow', onHash);
   window.removeEventListener('wheel', resume);
   window.removeEventListener('touchstart', resume);
   window.removeEventListener('keydown', onScrollKey);
   reduced.removeEventListener('change', instant);
   mobile.removeEventListener('change', instant);
  };
 }, [kind]);
 return <figure ref={ref} className="szkl-scene" data-scroll-scene={kind} data-scene-progress="0" data-motion="off" aria-labelledby={`scene-${kind}-title`}>
  <div className="szkl-scene__pin">
   <div className="szkl-scene__heading"><span>{kind === 'motion' ? '01 /' : '02 /'}</span><h3 id={`scene-${kind}-title`}>{scene.title[lang]}</h3></div>
   <div className="szkl-scene__stage">
    <img className="szkl-scene__background" data-scene-role="background" src={`/visuals/${scene.background}.webp`} alt="" aria-hidden="true" width="1536" height="1024" loading="lazy"/>
    <img className="szkl-scene__primary" data-scene-role="primary" src={`/visuals/${kind}-1.webp`} alt={scene.primaryAlt[lang]} width="1536" height="1024" loading={kind === 'motion' ? 'eager' : 'lazy'} decoding="async"/>
    <img className="szkl-scene__secondary" data-scene-role="secondary" src={`/visuals/${scene.secondary}.webp`} alt={scene.secondaryAlt[lang]} width="1536" height="1024" loading="lazy" decoding="async"/>
   </div>
   <figcaption className="szkl-scene__caption">
    <div><p>{scene.caption[lang]}</p><small>{lang === 'zh' ? 'AI 生成概念图 · 非实拍、产品界面或部署证明。' : 'AI-generated concept imagery · not photography, a product interface or deployment evidence.'}</small></div>
    <a href={`/?visual-studies=1&lang=${lang}#${kind}-1`}>{lang === 'zh' ? '查看视觉方案' : 'Explore the studies'} <span aria-hidden="true">↗</span></a>
   </figcaption>
  </div>
 </figure>;
}
