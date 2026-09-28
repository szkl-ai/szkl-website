import {useEffect,useId,useRef,useState,type CSSProperties} from 'react';
import {Pause,Play} from 'lucide-react';
import {tx,type Lang} from './content';
import {createNeuralPainter} from './neuralScene';
import './neural-explorer.css';

const stages=[
 {title:tx('Dataset streams','数据流'),detail:tx('Images · audio · time series','图像 · 音频 · 时序数据'),x:'9%'},
 {title:tx('Feature encoding','特征编码'),detail:tx('Signals become feature vectors','将信号编码为特征向量'),x:'27%'},
 {title:tx('Deep network','深层网络'),detail:tx('Weighted connections · activations','加权连接 · 神经元激活'),x:'49%'},
 {title:tx('Latent space','潜在空间'),detail:tx('Related patterns form clusters','相关模式形成簇群'),x:'77%'},
 {title:tx('Model outputs','模型输出'),detail:tx('Classification · retrieval · prediction','分类 · 检索 · 预测'),x:'93%'},
];

/** View-only scene: motion persists while visible, without running a model. */
export default function NeuralExplorer({lang}:{lang:Lang}){
 const root=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),clock=useRef(0),uid=useId();
 const [paused,setPaused]=useState(false),[reduced,setReduced]=useState(false),[mode,setMode]=useState('still'),[available,setAvailable]=useState(true);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);change();media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 useEffect(()=>{
  if(!canvas.current||!root.current)return;
  const painter=createNeuralPainter(canvas.current);if(!painter){setAvailable(false);return}
  let frame=0,visible=false,disposed=false,printing=false,last=0;
  const canRun=()=>visible&&!paused&&!reduced&&!document.hidden&&!printing&&!disposed;
  const render=(now:number)=>{
   frame=0;if(!canRun())return;
   if(!last)last=now;
   if(now-last>=1000/30){clock.current+=Math.min((now-last)/1000,.1);last=now;painter.draw(clock.current)}
   frame=requestAnimationFrame(render);
  };
  const sync=()=>{
   cancelAnimationFrame(frame);frame=0;last=0;
   setMode(reduced?'reduced':paused?'paused':canRun()?'playing':'suspended');
   if(canRun())frame=requestAnimationFrame(render);
  };
  const resize=()=>{painter.resize();painter.draw(clock.current)};
  const observer='IntersectionObserver' in window?new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:.05}):null;
  const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(canvas.current);resize();
  if(observer)observer.observe(canvas.current);else{visible=true;sync()}
  const beforePrint=()=>{printing=true;sync();resize()},afterPrint=()=>{printing=false;resize();sync()};
  document.addEventListener('visibilitychange',sync);window.addEventListener('beforeprint',beforePrint);window.addEventListener('afterprint',afterPrint);
  return()=>{disposed=true;cancelAnimationFrame(frame);observer?.disconnect();sizeObserver.disconnect();document.removeEventListener('visibilitychange',sync);window.removeEventListener('beforeprint',beforePrint);window.removeEventListener('afterprint',afterPrint)};
 },[paused,reduced]);
 return <figure ref={root} className="nv-visual" data-nv-state={mode} data-story-media="neural-network" aria-labelledby={`${uid}-caption`}>
  <figcaption id={`${uid}-caption`} className="nv-caption"><div><span>{tx('NEURAL NETWORKS / DATA AT SCALE','神经网络 / 大规模数据')[lang]}</span><strong>{tx('From data to representation.','从数据到表示。')[lang]}</strong></div>
   {reduced?<span className="nv-motion-note">{tx('Reduced motion','已减少动态效果')[lang]}</span>:<button className="nv-pause" type="button" aria-label={tx(paused?'Resume animation':'Pause animation',paused?'继续动画':'暂停动画')[lang]} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={14} aria-hidden="true"/>:<Pause size={14} aria-hidden="true"/>}<span>{tx(paused?'Play motion':'Pause motion',paused?'播放动态':'暂停动态')[lang]}</span></button>}
  </figcaption>
  <div className="nv-scene">
   <canvas ref={canvas} aria-hidden="true"/>
   <ol className="nv-inscene" aria-hidden="true">{stages.map((stage,i)=><li key={stage.title.en} style={{'--nv-x':stage.x} as CSSProperties}><span>0{i+1}</span>{stage.title[lang]}</li>)}</ol>
   {!available&&<p className="nv-fallback">{tx('Dataset streams → feature encoding → neural layers → representations → model outputs','数据流 → 特征编码 → 神经网络层 → 数据表示 → 模型输出')[lang]}</p>}
  </div>
  <p className="nv-description">{tx('Data streams move through connected neural layers. Activations propagate, related patterns form a representation, and task-specific outputs emerge.','数据流进入相连的神经网络层。激活沿连接传播，相关模式形成内部表示，最终映射为不同任务的输出。')[lang]}</p>
  <ol className="nv-labels" role="list">{stages.map((stage,i)=><li key={stage.title.en}><span className="nv-index">0{i+1}</span><div><strong>{stage.title[lang]}</strong><span>{stage.detail[lang]}</span></div></li>)}</ol>
 </figure>;
}
