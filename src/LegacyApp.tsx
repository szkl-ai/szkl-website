import {useEffect,useState} from 'react';
import {ArrowUpRight,ArrowRight,ArrowDown,Camera,Mic,Workflow,Link as LinkIcon,Download,Printer,Plus,Mail,FlaskConical} from 'lucide-react';
import {copy,products,people,tx,type Lang,type Text} from './content';
import {Approach} from './Method';
import ShowcaseVisuals from './ShowcaseVisuals';
import {GrowthThesis,PulseInvestigation,RalloRoute,ProductFacts,factKind} from './Strategy';
import {ExperimentDesigner,PhenolabEvidence,RalloEvidence,OperationsWorkbench,AgentWorkflowConcept,CaptureWorkbench} from './ApplicationEvidence';
const media=(name:string)=>`/media/${name}`;
const brand=(name:string)=>`/brand/${name}`;
const mailLink=(subject:string)=>`mailto:mliu@szkl.com?subject=${encodeURIComponent(subject)}`;
const supporting=products.filter(p=>['phenolab','nian','pheno-operations'].includes(p.id));
function App(){
 const params=new URLSearchParams(location.search);
 const [lang,setLang]=useState<Lang>(params.get('lang')==='zh'?'zh':'en');
 const profile=people.find(p=>location.pathname.replace(/\/$/,'')===`/people/${p.id}`);
 const initialApplication=params.get('application')==='labpilot'?'phenolab':params.get('application');
 const [selected,setSelected]=useState(supporting.some(p=>p.id===initialApplication)?initialApplication!:'phenolab');
 const [supportingOpen,setSupportingOpen]=useState(supporting.some(p=>p.id===initialApplication));
 const [toast,setToast]=useState('');
 const t=(text:Text)=>text[lang];
 const url=(path:string)=>`${path}?lang=${lang}`;
 useEffect(()=>{
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  document.title=profile?`${profile.name} | SZKL`:`SZKL — ${lang==='en'?'Project showcase':'项目展示'}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content',profile?t(profile.lead):t(tx('Explore SZKL project evidence, working prototypes and concepts.','探索 SZKL 项目证据、工作原型与概念。')));
  const next=new URL(location.href);next.searchParams.set('lang',lang);history.replaceState({},'',next);
 },[lang,profile]);
 useEffect(()=>{
  let frame=0;
  const reveal=(id:string)=>{
   const target=document.getElementById(id);if(!target)return;
   for(let parent=target.parentElement;parent;parent=parent.parentElement){if(parent instanceof HTMLDetailsElement)parent.open=true;}
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant'}));
  };
  const onHash=()=>{let id=location.hash.slice(1);try{id=decodeURIComponent(id)}catch{/* Preserve malformed fragments without breaking the page. */}reveal(id);};
  if((!location.hash.slice(1)||location.hash==='#applications')&&(initialApplication==='pulse'||initialApplication==='rallo'))reveal(initialApplication);else onHash();
  window.addEventListener('hashchange',onHash);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',onHash);};
 },[]);
 useEffect(()=>{if(!toast)return;const timeout=setTimeout(()=>setToast(''),4000);return()=>clearTimeout(timeout)},[toast]);
 const select=(id:string)=>{setSelected(id);setSupportingOpen(true);const u=new URL(location.href);u.searchParams.set('application',id);u.hash='applications';history.replaceState({},'',u)};
 const share=async()=>{try{await navigator.clipboard.writeText(location.href);setToast(t(copy.copied))}catch{setToast(t(copy.copyFail))}};
 const pulse=products.find(p=>p.id==='pulse')!;
 const rallo=products.find(p=>p.id==='rallo')!;
 const product=supporting.find(p=>p.id===selected)!;
 const productHref=({phenolab:'https://lab.szkl.com','pheno-operations':'https://pheno.szkl.com'} as Record<string,string>)[product.id];
 const showcase=params.get('showcase');
 const nian=products.find(p=>p.id==='nian')!;
 if(showcase)return <div className="showcase-page"><main><div className="showcase-top"><a href={`/?lang=${lang}&application=${showcase==='operations'?'pheno-operations':showcase==='rallo'?'rallo':showcase==='pulse'?'pulse':showcase==='nian'?'nian':'phenolab'}#applications`}>← {t(tx('Back to SZKL','返回 SZKL'))}</a><div className="language"><button aria-pressed={lang==='en'} onClick={()=>setLang('en')}>EN</button><button aria-pressed={lang==='zh'} onClick={()=>setLang('zh')}>中文</button></div></div>{showcase==='pulse'?<section className="standalone-product"><p className="eyebrow">Pulse</p><h1>{t(pulse.title)}</h1><p className="lead">{t(pulse.intro)}</p><PulseInvestigation lang={lang}/><ProductFacts lang={lang} id="pulse"/></section>:showcase==='nian'?<section className="standalone-product"><p className="eyebrow">Nian / 念 · {t(nian.tag)}</p><h1>{t(nian.title)}</h1><p className="lead">{t(nian.intro)}</p><div className="standalone-nian"><figure><img src={media(nian.image)} alt={t(nian.imageAlt)}/><figcaption>{t(nian.caption)}</figcaption></figure><OutputDemo kind="memory" lang={lang}/></div><a className="button primary" href={mailLink('Nian prototype enquiry')}>{t(nian.link)}<ArrowUpRight size={17}/></a></section>:showcase==='rallo'?<RalloEvidence lang={lang}/>:showcase==='operations'?<><OperationsWorkbench lang={lang}/><AgentWorkflowConcept lang={lang}/></>:showcase==='capture'?<CaptureWorkbench lang={lang}/>:<><ExperimentDesigner lang={lang}/><PhenolabEvidence lang={lang}/></>}<ShowcaseVisuals kind={showcase} lang={lang}/></main></div>;
 return <>
 <a className="skip" href="#main">{t(copy.skip)}</a>
 <header className="site-header"><div className="wrap header-inner">
  <a className="company-mark" href={url('/')} aria-label={t(copy.home)}><img src={brand('szkl-logo-black.png')} alt="SZKL" width="128"/><span>Shenzhen Knowledge Labs</span></a>
  <nav aria-label={t(tx('Main navigation','主导航'))}>{profile?<a href={url('/')}><ArrowRight className="back-arrow" size={15}/>{t(copy.back)}</a>:<><a href="#pulse">Pulse</a><a href="#rallo">RALLO</a><a href="#applications">{t(copy.applications)}</a><a href="#approach">{t(copy.approach)}</a><a href="#people">{t(copy.people)}</a></>}</nav>
  <div className="language" aria-label={t(copy.preferences)}><button onClick={()=>setLang('en')} aria-pressed={lang==='en'} lang="en">EN</button><button onClick={()=>setLang('zh')} aria-pressed={lang==='zh'} lang="zh-CN">中文</button></div>
 </div></header>
 {profile?<main id="main" className="profile wrap">
  <div className="profile-top"><span className="eyebrow">SZKL / {t(tx('People','人物'))}</span><div className="profile-tools"><button onClick={share}><LinkIcon size={15}/>{t(copy.share)}</button><button onClick={()=>window.print()}><Printer size={15}/>{t(copy.print)}</button></div></div>
  <section className="profile-hero"><div><p className="eyebrow">{t(profile.role)}</p><h1>{profile.name}<span>{profile.chinese}</span></h1><h2>{t(profile.headline)}</h2><p className="lead">{t(profile.lead)}</p>{profile.id==='michael'&&<div className="actions"><a className="button primary" href={mailLink(`Connect with ${profile.name}`)}><Mail size={17}/>{t(profile.contactLabel)}</a><a className="button secondary" href={`/contacts/${profile.id}.vcf`} download={`${profile.name.replace(/ /g,'-')}.vcf`}><Download size={17}/>{t(copy.download)}</a></div>}</div><figure className="portrait"><img src={media(profile.image)} alt={profile.name}/><figcaption>{profile.name} / Shenzhen Knowledge Labs</figcaption></figure></section>
  <section className="profile-story"><div><h2>{t(copy.background)}</h2><p>{t(profile.bio)}</p><p>{t(profile.background)}</p></div><aside><h2>{t(copy.focus)}</h2>{profile.focus.map((x,i)=><div className="focus-item" key={i}><span>0{i+1}</span>{t(x)}</div>)}</aside></section>
  <section className="profile-connect"><div><p className="eyebrow">{t(copy.connect)}</p><p>{t(profile.connect)}</p></div><div className="profile-links"><h3>{t(copy.links)}</h3>{profile.email&&<a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={17}/></a>}{profile.linkedin?<a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={17}/></a>:<div>LinkedIn <span>{t(copy.placeholder)}</span></div>}<div>WeChat <span>{t(copy.placeholder)}</span></div><div>{t(tx('Other social profiles','其他社交账号'))}<span>{t(copy.placeholder)}</span></div></div></section>
  <a className="text-link profile-site" href={url('/')}>{t(tx('Explore the physical AI vision at SZKL','探索 SZKL 的真实世界 AI 愿景'))}<ArrowRight size={18}/></a>
 </main>:<main id="main">
 <section className="opening wrap" aria-labelledby="opening-title">
  <div className="opening-grid">
   <div className="opening-head"><p className="eyebrow"><span className="blue-rule"/>{t(copy.eyebrow)}</p><h1 id="opening-title">{t(copy.heroTitle)}</h1><p className="opening-formula" aria-label={t(tx('Our method: capture, compute, act','我们的方法：采集、计算、行动'))}>{t(copy.capture)}<ArrowRight size={15}/>{t(copy.understand)}<ArrowRight size={15}/>{t(copy.act)}<a href="#approach">{t(copy.methodLink)}<ArrowDown size={15}/></a></p></div>
   <div className="opening-copy"><p className="lead">{t(copy.heroLead)}</p><p className="hero-sub">{t(copy.heroSub)}</p><div className="actions"><a className="button primary" href="#rallo">{t(copy.watchDemo)}<ArrowDown size={17}/></a><a className="button secondary" href={mailLink('Discuss a real-world workflow')}>{t(copy.discuss)}<ArrowUpRight size={17}/></a></div></div>
  </div>
  <nav className="product-index" aria-label={t(copy.indexLabel)}>
   <div className="index-label"><span>{t(copy.indexLabel)}</span><span aria-hidden="true">{t(copy.capture)} · {t(copy.understand)} · {t(copy.act)}</span></div>
   {copy.index.map(row=><a key={row.num} href={row.href}><span className="idx-num">{row.num}</span><strong>{t(row.name)}</strong><span className="idx-desc">{t(row.desc)}</span><ArrowDown size={17}/></a>)}
  </nav>
 </section>
 <div className="products-band" id="focus">
 <section className="product-stage section" id="pulse" aria-labelledby="pulse-title">
  <div className="wrap">
   <div className="stage-top"><p className="eyebrow">01 / {t(factKind('pulse'))}</p></div>
   <div className="product-top pulse">
    <div className="product-copy"><div className="pulse-mark"><img src={brand('pulse-logo-horizontal.png')} alt="PULSE — Make Knowledge Count."/></div><h2 id="pulse-title">{t(pulse.title)}</h2><p>{t(pulse.intro)}</p><p className="product-for">{t(pulse.takeaway)}</p><a className="button white" href={mailLink('Pulse manufacturing pilot enquiry')}>{t(pulse.link)}<ArrowUpRight size={18}/></a></div>
    <PulseInvestigation lang={lang}/>
   </div>
   <details className="product-details"><summary>{t(tx('Inside Pulse: workflow, evidence and pilot scope','了解 Pulse：工作流程、证据与试点范围'))}<Plus size={18}/></summary>
   <div className="product-flow">{[pulse.input,pulse.model,pulse.action].map((text,i)=><div key={i}><span className="mini-index">0{i+1} / {t([copy.capture,copy.understand,copy.act][i])}</span><p>{t(text)}</p></div>)}</div>
   <div className="product-gallery"><figure><img src={media(pulse.secondary)} alt={t(pulse.secondaryAlt)} loading="lazy"/><figcaption>{t(pulse.secondaryCaption)}</figcaption></figure><OutputDemo kind="enterprise" lang={lang}/></div>
   <ProductFacts lang={lang} id="pulse"/>
   </details>

  </div>
 </section>
 <section className="product-stage section" id="rallo" aria-labelledby="rallo-title">
  <div className="wrap">
   <div className="stage-top"><p className="eyebrow">02 / {t(factKind('rallo'))}</p></div>
   <div className="product-top rallo">
    <div className="product-copy"><img className="rallo-mark" src={brand('rallo-white.svg')} alt="RALLO"/><h2 id="rallo-title">{t(rallo.title)}</h2><p>{t(rallo.intro)}</p><p className="product-for">{t(rallo.takeaway)}</p><a className="button white" href="https://sports.szkl.com" target="_blank" rel="noopener noreferrer">{t(rallo.link)}<ArrowUpRight size={18}/></a></div>
    <RalloEvidence lang={lang}/>
   </div>
   <details className="product-details"><summary>{t(tx('Inside RALLO: technology and the venue experience','了解 RALLO：技术与场馆体验'))}<Plus size={18}/></summary>
   <div className="product-flow">{[rallo.input,rallo.model,rallo.action].map((text,i)=><div key={i}><span className="mini-index">0{i+1} / {t([copy.capture,copy.understand,copy.act][i])}</span><p>{t(text)}</p></div>)}</div>
   <div className="product-gallery"><figure><img src={media(rallo.image)} alt={t(rallo.imageAlt)} loading="lazy"/><figcaption>{t(rallo.caption)}</figcaption></figure><OutputDemo kind="sport" lang={lang}/></div>
   <RalloRoute lang={lang}/>
   <ProductFacts lang={lang} id="rallo"/>
   </details>

  </div>
 </section>
 <section className="applications section" id="applications"><div className="wrap"><div className="section-heading light"><p className="eyebrow">{t(copy.appsLabel)}</p><h2>{t(copy.appsTitle)}</h2><p>{t(copy.appsLead)}</p></div><div className="product-tabs" role="tablist" aria-label={t(copy.chosen)}>{supporting.map((p,i)=><button key={p.id} id={`tab-${p.id}`} role="tab" aria-selected={p.id===selected} aria-controls="application-view" tabIndex={p.id===selected?0:-1} onClick={()=>select(p.id)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?supporting.length-1:(i+(e.key==='ArrowRight'?1:supporting.length-1))%supporting.length;select(supporting[n].id);document.getElementById(`tab-${supporting[n].id}`)?.focus()}}}><span className="tab-index">0{i+1}</span><span className="tab-name">{p.name}<small>{t(p.category)}</small></span><ArrowUpRight size={20}/></button>)}</div>
 <details className="product-details supporting-details" open={supportingOpen} onToggle={e=>setSupportingOpen(e.currentTarget.open)}><summary>{t(tx('Explore the workbench and product details','查看工作台与产品详情'))}<Plus size={18}/></summary>
 <div className="application-view" id="application-view" role="tabpanel" aria-labelledby={`tab-${selected}`}>
 <div className={`product-top ${product.id}`}><div className="product-copy"><p className="eyebrow">{t(product.tag)}</p>{['phenolab','pheno-operations'].includes(product.id)?<div className="phenolab-identity"><div className="phenolab-mark"><img src={brand('pheno-logo.png')} alt="Pheno"/></div><p className="product-name">{product.id==='phenolab'?'Phenolab':t(tx('Operations','运营'))}</p></div>:<p className="product-name">{product.name} <span>{product.cn}</span></p>}<h3>{t(product.title)}</h3><p>{t(product.intro)}</p><p className="product-for">{t(product.takeaway)}</p><a className="button white" href={productHref||mailLink(`${product.name} pilot enquiry`)} target={productHref?'_blank':undefined} rel={productHref?'noopener noreferrer':undefined}>{t(product.link)}<ArrowUpRight size={18}/></a></div>{product.id==='phenolab'?<ExperimentDesigner lang={lang}/>:product.id==='pheno-operations'?<OperationsWorkbench lang={lang}/>:<figure className={`product-image ${product.id}`}><img src={media(product.image)} alt={t(product.imageAlt)} loading="lazy"/><figcaption>{t(product.caption)}</figcaption></figure>}</div>
 <div className="product-flow">{[product.input,product.model,product.action].map((text,i)=><div key={i}><span className="mini-index">0{i+1} / {t([copy.capture,copy.understand,copy.act][i])}</span><p>{t(text)}</p></div>)}</div>
 {product.id==='phenolab'?<PhenolabEvidence lang={lang}/>:product.id==='pheno-operations'?<AgentWorkflowConcept lang={lang}/>:<div className="product-gallery"><figure><img src={media(product.secondary)} alt={t(product.secondaryAlt)} loading="lazy"/><figcaption>{t(product.secondaryCaption)}</figcaption></figure><OutputDemo kind={product.demo} lang={lang}/></div>}
 </div></details></div></section>
 </div>
 <Approach lang={lang}/>
 <GrowthThesis lang={lang}/>
 <section className="roots section"><div className="wrap roots-grid"><figure><img src={media('lab-photo.jpg')} alt={t(copy.photoCaption)} loading="lazy"/><figcaption>{t(copy.photoCaption)}</figcaption></figure><div><p className="eyebrow">{t(copy.rootsLabel)}</p><h2>{t(copy.rootsTitle)}</h2><p>{t(copy.rootsBody)}</p><p>{t(copy.rootsSub)}</p><div className="roots-brand"><img src={brand('pheno-logo.png')} alt="Pheno"/><span>{t(tx('Our materials R&D foundation','我们的材料研发起点'))}</span></div></div></div></section>
 <section className="principles section wrap"><div className="section-heading"><p className="eyebrow">{t(tx('How we build','构建原则'))}</p><h2>{t(copy.principlesTitle)}</h2></div><div className="principle-list">{copy.principles.map((p,i)=><article key={i}><span>0{i+1}</span><div><h3>{t(p.title)}</h3><p>{t(p.body)}</p></div></article>)}</div></section>
 <section className="team section wrap" id="people"><div className="section-heading"><p className="eyebrow">{t(copy.people)}</p><h2>{t(copy.teamTitle)}</h2><p>{t(copy.teamLead)}</p></div><div className="team-grid">{people.map(p=><a className="person" href={url(`/people/${p.id}/`)} key={p.id}><img src={media(p.image)} alt={p.name} loading="lazy"/><div><p className="eyebrow">{t(p.role)}</p><h3>{p.name}<span>{p.chinese}</span></h3><p>{t(p.short)}</p><span className="text-link">{t(copy.bioLink)}<ArrowUpRight size={18}/></span></div></a>)}</div></section>
 <section className="contact section" id="contact"><div className="wrap contact-grid"><div><p className="eyebrow">{t(copy.contact)}</p><h2>{t(copy.contactTitle)}</h2><p>{t(copy.contactBody)}</p></div><div className="contact-actions"><a className="button white" href={mailLink('Let’s explore physical AI')}>{t(copy.mail)}<ArrowUpRight size={18}/></a><a href="mailto:mliu@szkl.com">mliu@szkl.com</a><a href="https://www.linkedin.com/in/michaelmliu1/" target="_blank" rel="noreferrer">Michael / LinkedIn<ArrowUpRight size={15}/></a></div></div></section>
 </main>}
 <footer className="wrap site-footer"><a href={url('/')}><img src={brand('szkl-logo-black.png')} alt="SZKL" width="112"/></a><div><strong>Shenzhen Knowledge Labs</strong><span>{t(copy.footer)}</span></div><span>© {new Date().getFullYear()} SZKL</span></footer>
 <div role="status" className={`toast ${toast?'visible':''}`}>{toast}</div>
 </>
}
function OutputDemo({kind,lang}:{kind:string;lang:Lang}){
 const t=(x:Text)=>x[lang];
 const content=kind==='memory'?{
 label:tx('Application output','应用输出'),icon:Mic,title:tx('The day, in three layers.','一天，三层记忆。'),
 rows:[{label:tx('01 / Full transcript','01 / 完整转写'),text:tx('“Let’s compare the two samples tomorrow.”','“我们明天比较一下这两个样品。”')},{label:tx('02 / Conversation summary','02 / 分段摘要'),text:tx('Team discussed comparing the latest samples.','团队讨论了对最新样品进行比较。')},{label:tx('03 / Day summary','03 / 全天回顾'),text:tx('A sample comparison was proposed. Confirm the owner and timing.','今天提出了一项样品比较计划，需确认负责人和时间。')}]
 }:kind==='sport'?{
 label:tx('From analysis to practice','从分析到练习'),icon:Camera,title:tx('A clip worth reviewing.','找到值得复盘的片段。'),
 rows:[{label:tx('Observe','观察'),text:tx('Locate a rally and follow the player through it.','定位回合，查看球员在回合中的移动。')},{label:tx('Review','复盘'),text:tx('Watch the movement with its video context.','结合原始视频回看动作。')},{label:tx('Act','行动'),text:tx('Agree on a practice focus with your coach.','与教练一起确定练习重点。')}]
 }:kind==='lab'?{
 label:tx('The Phenolab workflow','Phenolab 工作流程'),icon:FlaskConical,title:tx('Keep the scientific trail intact.','保留完整的科研证据链。'),
 rows:[{label:tx('Record','记录'),text:tx('Link the observation to the sample and procedure step.','将观察关联到样品和具体操作步骤。')},{label:tx('Compare','比较'),text:tx('Review the conditions and outcomes across runs.','跨批次比较实验条件与结果。')},{label:tx('Carry forward','继续探索'),text:tx('Use the reviewed evidence to plan the next experiment.','依据经过审核的证据，规划下一轮实验。')}]
 }:{
 label:tx('An investigation that can be reviewed','可复核的排查过程'),icon:Workflow,title:tx('Evidence → action → verified outcome.','证据 → 行动 → 结果验证。'),
 rows:[{label:tx('Observation','观察'),text:tx('Link the defect, material lot and process history.','关联缺陷、物料批次与工艺历史。')},{label:tx('Decision brief','决策简报'),text:tx('Show likely causes, missing evidence and tests to distinguish them.','呈现可能原因、缺失证据及区分假设的测试。')},{label:tx('Review & verify','审核与验证'),text:tx('An engineer approves the plan and checks the result against a baseline.','由工程师批准方案，并对照基线核验结果。')}]
 };
 const Icon=content.icon;
 return <aside className="output-demo"><div className="demo-top"><span>{t(content.label)}</span><Icon size={21}/></div><h4>{t(content.title)}</h4><div className="demo-rows">{content.rows.map((row,i)=><div key={i}><span>{t(row.label)}</span><p>{t(row.text)}</p></div>)}</div></aside>
}
export default App;
