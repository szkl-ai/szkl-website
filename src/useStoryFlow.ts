import {useEffect, useRef} from 'react';

/** One passive, geometry-driven enhancement; the unenhanced document is complete. */
export function useStoryFlow() {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const root=ref.current;
  if(!root || !('IntersectionObserver' in window)) return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const sections=Array.from(root.querySelectorAll<HTMLElement>('[data-story-section]'));
  const text=Array.from(root.querySelectorAll<HTMLElement>('h1, .g-section-head h2, .g-section-head>div>p, .g-hero-copy>p, .g-phase-title h3, .g-phase-story h4, .g-phase-story>p, .g-why, .g-phase-detail dl>div, .g-contribution, .g-thesis>p, .g-thesis>div, .g-shifts h3, .g-shifts p, .sf-local-copy h3, .sf-local-copy p, .g-person h3, .g-person>p, .g-project-description h3, .g-project-description>p, .sf-design-copy h3, .sf-design-copy>p, .g-lab figcaption>p, .g-contact h2, .g-contact p'));
  text.forEach(el=>{el.dataset.storyEffect='text';});
  const effects=Array.from(root.querySelectorAll<HTMLElement>('[data-story-effect]'));
  const owners=new Map(effects.map(el=>[el,el.closest<HTMLElement>('[data-story-section]')]));
  const visible=new Set<HTMLElement>();
  const shifts=new Map<HTMLElement,number>();
  let frame=0,disposed=false;
  const clamp=(n:number)=>Math.max(0,Math.min(1,n));
  const update=()=>{
   frame=0;if(disposed)return;
   root.dataset.storyMotion=reduced.matches?'reduced':'active';
   if(reduced.matches)return;
   const vh=innerHeight;
   // Read first, write second: no scroll-triggered React render or layout thrashing.
   const geometry=effects.filter(el=>visible.has(owners.get(el)!)).map(el=>({el,rect:el.getBoundingClientRect(),owner:owners.get(el)!}));
   const boxes=new Map(Array.from(visible,el=>[el,el.getBoundingClientRect()]));
   for(const [section,rect] of boxes){
    const progress=clamp((vh*.9-rect.top)/(vh*.9+Math.min(rect.height,vh*.8)));
    section.dataset.storyProgress=progress.toFixed(4);
    section.style.setProperty('--sf-progress',String(progress));
   }
   for(const {el,rect,owner} of geometry){
    const settled=owner.dataset.storySettled==='true'||owner.matches(':focus-within');
    const top=rect.top-(shifts.get(el)||0);
    const progress=settled?1:clamp((vh*.94-top)/(vh*.66));
    if(el.dataset.storyEffect==='mask')el.style.setProperty('--sf-crop',`${((1-progress)*12).toFixed(3)}%`);
    if(el.dataset.storyEffect==='text'){
     const index=Array.prototype.indexOf.call(owner.parentElement?.children||[],owner);
     const stage=owner.dataset.storySection==='person'?Math.min(index,2)*.045:0;
     const y=settled?0:(1-clamp(progress-stage))*28;
     shifts.set(el,y);el.style.setProperty('--sf-text-y',`${y.toFixed(2)}px`);
    }
   }
  };
  const schedule=()=>{if(!frame&&!disposed)frame=requestAnimationFrame(update)};
  const settleHash=()=>{
   let id=location.hash.slice(1);try{id=decodeURIComponent(id)}catch{/* Malformed fragment: leave the page readable. */}
   const aliases:Record<string,string>={applications:'projects',approach:'technology',compute:'understanding',act:'action',labpilot:'phenolab','pheno-operations':'pulse'};
   const target=document.getElementById(aliases[id]||id);
   sections.forEach(section=>{section.dataset.storySettled=String(!!target&&(section.contains(target)||target.contains(section)))});
   schedule();
  };
  const resume=()=>{sections.forEach(section=>{section.dataset.storySettled='false'});schedule()};
  const onScrollKey=(event:KeyboardEvent)=>{
   const target=event.target as HTMLElement|null;
   if(event.defaultPrevented||event.ctrlKey||event.altKey||event.metaKey||target?.closest('input,textarea,select,[contenteditable=true]'))return;
   if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))resume();
  };
  window.addEventListener('wheel',resume,{passive:true});window.addEventListener('touchstart',resume,{passive:true});window.addEventListener('keydown',onScrollKey);
  const io=new IntersectionObserver(entries=>{for(const entry of entries){const el=entry.target as HTMLElement;entry.isIntersecting?visible.add(el):visible.delete(el)}schedule()},{rootMargin:'180px 0px'});
  sections.forEach(el=>io.observe(el));
  const resize=new ResizeObserver(schedule);resize.observe(root);sections.forEach(el=>resize.observe(el));
  root.addEventListener('load',schedule,true);
  root.addEventListener('focusin',schedule);root.addEventListener('focusout',schedule);
  root.querySelectorAll('img').forEach(img=>{if(img.complete)void img.decode().then(schedule,schedule)});
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});window.addEventListener('hashchange',settleHash);
  reduced.addEventListener('change',schedule);
  settleHash();schedule();
  return()=>{
   disposed=true;cancelAnimationFrame(frame);io.disconnect();resize.disconnect();
   window.removeEventListener('wheel',resume);window.removeEventListener('touchstart',resume);window.removeEventListener('keydown',onScrollKey);
   root.removeEventListener('load',schedule,true);root.removeEventListener('focusin',schedule);root.removeEventListener('focusout',schedule);
   window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('hashchange',settleHash);reduced.removeEventListener('change',schedule);
   delete root.dataset.storyMotion;
   effects.forEach(el=>{el.style.removeProperty('--sf-crop');el.style.removeProperty('--sf-text-y')});
   sections.forEach(el=>{delete el.dataset.storyProgress;delete el.dataset.storySettled;el.style.removeProperty('--sf-progress')});
   text.forEach(el=>delete el.dataset.storyEffect);
  };
 },[]);
 return ref;
}
