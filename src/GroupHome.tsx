import {useEffect, useState} from 'react';
import {ArrowUpRight, ArrowRight, ArrowDown, Menu, X} from 'lucide-react';
import {people, copy, tx, type Lang, type Text} from './content';
import {platforms} from './platforms';
import StoryMedia from './StoryMedia';
import ExperimentWorkflow from './ExperimentWorkflow';
import NeuralExplorer from './NeuralExplorer';
import {useStoryFlow} from './useStoryFlow';
import './story-flow.css';

const navigation = [
 ['positioning', tx('Thesis', '核心主张')], ['technology', tx('Technology', '技术路径')],
 ['why-now', tx('Why now', '为何是现在')], ['people', tx('Team', '团队')],
 ['projects', tx('Projects', '项目')], ['contact', tx('Contact', '联系')],
] as const;
const description = tx('SZKL connects real-world capture, contextual understanding and controlled action. A Shenzhen team building across hardware, AI and software.', 'SZKL 连接真实世界的数据采集、场景理解与受控执行。扎根深圳，以硬件、AI 与软件协同构建物理 AI 系统。');
const phases = [
 {id:'capture', number:'01', name:tx('Capture','采集'), question:tx('Start with what is real.','从真实信号开始。'),
  intro:tx('Establish the observation before asking a model to explain it. Capture the signals a task needs, with their timing, provenance and permissions intact.','在让模型解释之前，先建立可信的观察。围绕任务采集必要信号，保留时间、来源与使用权限。'),
  families:[
   [tx('Sensing & interfaces','传感与接口'),tx('Cameras, microphones, sensors and instrument interfaces connect the system to its environment.','相机、麦克风、传感器与仪器接口，让系统连接真实环境。')],
   [tx('Signal engineering','信号工程'),tx('Embedded firmware, calibration, time synchronization and edge preprocessing make observations comparable and usable.','通过嵌入式固件、标定、时间同步与端侧预处理，让观测可用、可比较。')],
  ], why:tx('A model cannot recover context that was never recorded. Better input is not more data; it is the right evidence.','模型无法可靠地还原从未记录的上下文。更好的输入不等于更多数据，而是恰当的证据。'),
  contribution:tx('Our work connects capture hardware and experimental interfaces to the records people actually need. We define the observation, then engineer the acquisition path.','我们将采集硬件、实验接口与实际需要的记录相连接。先定义观察目标，再设计采集路径。'),
  output:tx('Signals + context + permission','信号 + 上下文 + 权限')},
 {id:'understanding', number:'02', name:tx('Understanding','理解'), question:tx('Turn observations into context.','让观察成为理解。'),
  intro:tx('Different signals need different models. Combine perception, retrieval and domain reasoning, then evaluate whether the interpretation is useful—and where it is uncertain.','不同信号需要不同模型。结合感知、检索与领域推理，评估理解结果是否有用，以及哪些部分仍不确定。'),
  families:[
   [tx('Vision & speech','视觉与语音'),tx('Detection, tracking and pose estimation locate events and movement. Speech recognition (ASR) and speaker diarization structure what was said and who spoke when.','检测、追踪与姿态估计定位事件和动作；语音识别（ASR）与说话人分离，组织对话内容及发言时序。')],
   [tx('Context & prediction','上下文与预测'),tx('Multimodal and language models interpret task context; retrieval reconnects answers to records. Domain predictive models test relationships in experimental or operational data.','多模态与语言模型理解任务上下文，检索将回答关联到记录；领域预测模型分析实验或业务数据中的关系。')],
  ], why:tx('A plausible answer is not an established fact. Traceable evidence, evaluation and uncertainty must travel with the result.','看似合理的回答不等于事实。结果必须伴随可追溯证据、评估与不确定性说明。'),
  contribution:tx('We connect models to domain data and evaluation. A tracking prototype combines YOLO11s-pose player pose with TrackNetV3 shuttle observations, under evaluation on recorded footage.','我们将模型与领域数据、评估流程相连接。追踪原型结合 YOLO11s-pose 球员姿态与 TrackNetV3 羽毛球观测，正在录制视频上评估。'),
  output:tx('Evidence + interpretation + uncertainty','证据 + 解释 + 不确定性')},
 {id:'action', number:'03', name:tx('Action','行动'), question:tx('Make the next step accountable.','让下一步可控、可复核。'),
  intro:tx('Connect an interpretation to an authorized next step. A recommendation, a software action and physical control have different requirements; they are not interchangeable.','将理解结果连接到获授权的下一步。建议、软件操作与物理控制有不同要求，不能混为一谈。'),
  families:[
   [tx('Tools & orchestration','工具与编排'),tx('Tool-using models, workflow orchestration and APIs prepare bounded actions using structured inputs and explicit permissions.','通过工具调用模型、工作流编排与 API，结合结构化输入和明确权限，准备限定范围内的操作。')],
   [tx('Approval & verification','审批与核验'),tx('People approve consequential recommendations. Instrument or automation integration is scoped separately; every executed action needs an outcome check.','重要建议须经人工批准。仪器或自动化集成需单独界定范围，已执行操作还需核验结果。')],
  ], why:tx('Generating a plan is not completing a task. Closing the loop means checking what actually happened, and carrying that evidence forward.','生成方案不等于完成任务。闭环意味着核验实际结果，并将证据带入下一轮。'),
  contribution:tx('We build connected records and workflows, developing action proposals that preserve the evidence, approval and outcome as one accountable chain.','我们构建关联记录与工作流程，开发待审核的行动方案，让证据、授权与结果连成可追溯的完整链路。'),
  output:tx('Authorized action + verified outcome','授权行动 + 结果核验')},
];
const projects = platforms;
const shifts = [
 {title:tx('More signals can be interpreted.','更多信号可以被理解。'), body:tx('Multimodal models extend interpretation beyond text. The engineering question becomes which observations to connect, and how to evaluate the result.','多模态模型让理解不再局限于文本。工程重点转向：连接哪些观察，以及如何评估结果。')},
 {title:tx('Compute can move closer to the source.','计算可以更靠近现场。'), body:tx('Sensing and edge compute offer practical deployment choices under latency, connectivity and privacy constraints. The architecture follows the task.','传感与端侧计算，为时延、网络和隐私约束下的部署提供选择。围绕任务选择合适的架构。')},
 {title:tx('Inference can enter the workflow.','推理可以进入工作流程。'), body:tx('Tool use can connect model output to software systems. Permissions, human approval and outcome verification determine what should actually execute.','工具调用可将模型输出连接到软件系统。权限、人工审批与结果核验，决定哪些操作应当真正执行。')},
];

export default function GroupHome() {
 const storyRef=useStoryFlow();
 const [lang, setLang] = useState<Lang>(new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en');
 const [menuOpen, setMenuOpen] = useState(false);
 const t = (value:Text) => value[lang];
 useEffect(() => {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.title = lang === 'en' ? 'SZKL — Intelligence, grounded in the physical world.' : 'SZKL — 让智能，扎根真实世界。';
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(description));
  const next = new URL(location.href); next.searchParams.set('lang', lang); history.replaceState({}, '', next);
 }, [lang]);
 useEffect(() => {
  let frame = 0;
  const aliases:Record<string,string> = {applications:'projects', approach:'technology', capture:'capture', compute:'understanding', act:'action', labpilot:'phenolab', 'pheno-operations':'pulse'};
  const reveal = () => {
   let fragment = location.hash.slice(1); try { fragment = decodeURIComponent(fragment); } catch { /* Ignore malformed encoding. */ }
   const application = new URLSearchParams(location.search).get('application') || '';
   const projectIds = projects.map(project => project.id);
   const applicationId = application === 'labpilot' ? 'phenolab' : application === 'pheno-operations' ? 'pulse' : application;
   const requested = (!fragment || fragment === 'applications') && projectIds.includes(applicationId) ? applicationId : fragment || applicationId;
   const target = document.getElementById(aliases[requested] || requested);
   if (target) { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => target.scrollIntoView({behavior:'instant'})); }
  };
  reveal(); window.addEventListener('hashchange', reveal);
  return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', reveal); };
 }, []);
 const chooseLanguage = (next:Lang) => {setLang(next); setMenuOpen(false);};
 return <div className="group-site story-flow" ref={storyRef}>
  <a className="skip" href="#main">{t(copy.skip)}</a>
  <header className="g-header">
   <div className="g-wrap g-header-inner">
    <a className="g-brand" href={`/?lang=${lang}`} aria-label={t(tx('SZKL home','SZKL 首页'))}><img src="/brand/szkl-logo-black.png" width="128" height="32" alt="SZKL"/></a>
    <nav id="group-navigation" className={menuOpen?'g-nav is-open':'g-nav'} aria-label={t(tx('Main navigation','主导航'))}>{navigation.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{t(label)}</a>)}</nav>
    <div className="g-languages" role="group" aria-label={t(copy.preferences)}><button lang="en" aria-pressed={lang==='en'} onClick={()=>chooseLanguage('en')}>EN</button><button lang="zh-CN" aria-pressed={lang==='zh'} onClick={()=>chooseLanguage('zh')}>中文</button></div>
    <button className="g-menu" aria-label={t(menuOpen?tx('Close navigation','关闭导航'):tx('Open navigation','打开导航'))} aria-expanded={menuOpen} aria-controls="group-navigation" onClick={()=>setMenuOpen(!menuOpen)} onKeyDown={e=>{if(e.key==='Escape')setMenuOpen(false)}}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
   </div>
  </header>
  <main id="main">
   <section id="positioning" className="g-hero g-wrap" data-story-section="hero" aria-labelledby="group-title">
    <div className="g-kicker g-hero-kicker"><span>Shenzhen Knowledge Labs</span><span>{t(tx('Physical AI / An integrated approach','物理 AI / 一体化工程'))}</span></div>
    <div className="g-hero-grid">
     <div className="sf-hero-text"><h1 id="group-title">{t(tx('Intelligence,','让智能，'))}<br/>{t(tx('grounded in the','扎根'))}<br/><span>{t(tx('physical world.','真实世界。'))}</span></h1>
     <div className="g-hero-copy"><p className="g-lead">{t(tx('The real world does not arrive as a prompt.','真实世界，不会自动变成一句提示词。'))}</p><p>{t(tx('It arrives as signals, incomplete context and decisions with consequences. SZKL brings hardware, AI and software together to connect what a system can observe, what it can understand, and what it should do next.','它以信号、不完整的上下文，以及影响真实结果的决策呈现。SZKL 将硬件、AI 与软件结合，连接系统能观察什么、能理解什么，以及下一步应做什么。'))}</p><div className="g-actions"><a className="g-button" href="#technology">{t(tx('Explore our approach','探索技术路径'))}<ArrowDown size={17}/></a><a className="g-text-link" href="#contact">{t(tx('Build with us','与我们共建'))}<ArrowUpRight size={17}/></a></div></div>
     </div><StoryMedia id="motion-1" lang={lang} eager/>
    </div>
    <figure className="g-system" data-story-section="system" aria-labelledby="system-caption">
     <div className="g-system-top"><span>{t(tx('A system, not a single model','是一个系统，而非单个模型'))}</span></div>
     <div className="sf-system-track" data-story-effect="line" aria-hidden="true"/><div className="g-system-flow">{phases.map(phase=><div className="g-system-node" key={phase.id}><span className="g-kicker">{phase.number} / {t(phase.name)}</span><strong>{t(phase.id==='capture'?tx('Sources & signals','来源与信号'):phase.id==='understanding'?tx('Models & context','模型与上下文'):tx('Decisions & actions','决策与行动'))}</strong><p>{t(phase.id==='capture'?tx('Observe deliberately','有目的地观察'):phase.id==='understanding'?tx('Interpret with evidence','依据证据理解'):tx('Authorize, then verify','授权执行，再核验'))}</p><ArrowRight className="g-flow-arrow" size={22} aria-hidden="true"/></div>)}</div>
     <div className="g-feedback"><span aria-hidden="true">↖</span><p>{t(tx('Evaluated feedback','经评估的反馈'))}<span>{t(tx('Outcomes refine the next observation, interpretation and decision.','以实际结果，改进下一轮观察、理解与决策。'))}</span></p><span aria-hidden="true">↵</span></div>
     <figcaption id="system-caption">{t(tx('Our thesis: engineer the entire loop. Keep evidence, permissions and people connected throughout.','我们的主张：围绕完整闭环开展工程研发，始终连接证据、权限与人。'))}</figcaption>
    </figure>
   </section>

   <section id="technology" className="g-technology g-section" aria-labelledby="technology-title"><div className="g-wrap">
    <div className="g-section-head" data-story-section="heading"><p className="g-kicker">01 / {t(tx('Technology','技术路径'))}</p><div><h2 id="technology-title">{t(tx('Three responsibilities.','三个职责，'))}<br/>{t(tx('One connected system.','一个相连的系统。'))}</h2><p>{t(tx('We invest engineering effort across the sensing-to-action chain. Model families are selected and evaluated for each problem—not treated as a universal stack.','我们围绕从感知到行动的完整链路投入工程研发。按具体问题选择和评估模型家族，而非套用一套万能技术栈。'))}</p></div></div>
    <div className="g-phase-list">{phases.map(phase=><article id={phase.id} data-phase={phase.id} key={phase.id} className={`g-phase sf-phase--${phase.id}`} data-story-section={phase.id} aria-labelledby={`${phase.id}-title`}>
     <div className="sf-chapter-track" data-story-effect="line" aria-hidden="true"/><div className="g-phase-title"><span className="g-phase-number">{phase.number}</span><h3 id={`${phase.id}-title`}>{t(phase.name)}</h3><span className="g-phase-output">{t(phase.output)}</span></div>
     <div className="g-phase-story"><h4>{t(phase.question)}</h4><p>{t(phase.intro)}</p><div className="g-why"><span className="g-kicker">{t(tx('Why it matters','为什么重要'))}</span><p>{t(phase.why)}</p></div></div>
     {phase.id==='understanding'?<NeuralExplorer lang={lang}/>:<StoryMedia id={phase.id==='capture'?'hardware-1':'motion-2'} lang={lang}/>}
     <div className="g-phase-detail"><dl>{phase.families.map(([title,body])=><div key={title.en}><dt>{t(title)}</dt><dd>{t(body)}</dd></div>)}</dl><div className="g-contribution"><span className="g-kicker">{t(tx('Our engineering focus','我们的工程重点'))}</span><p>{t(phase.contribution)}</p></div></div>
    </article>)}</div>
    <div className="g-loop-note"><ArrowRight size={22}/><p>{t(tx('The dependencies run both ways: capture shapes what models can know; the intended action sets the evidence standard; verified outcomes inform the next cycle.','各层互为依赖：采集决定模型能知道什么；预期行动决定证据标准；经过核验的结果进入下一轮。'))}</p></div>
   </div></section>

   <section id="why-now" className="g-now g-section" aria-labelledby="now-title"><div className="g-wrap">
    <div className="g-section-head" data-story-section="heading"><p className="g-kicker">02 / {t(tx('Why now','为何是现在'))}</p><div><h2 id="now-title">{t(tx('The pieces are advancing.','技术在前进，'))}<br/>{t(tx('The work is in the connections.','功夫在连接处。'))}</h2></div></div>
    <div className="g-now-grid" data-story-section="why-now"><div className="g-thesis"><span className="g-kicker">{t(tx('Where we choose to build','我们选择的构建方向'))}</span><p>{t(tx('Between the signal and the useful outcome.','在信号与有用的结果之间。'))}</p><div>{t(tx('Data quality. Domain context. Integration. Reliability. Permissions. We work across these boundaries to preserve context from the first observation to the evaluated outcome.','数据质量、领域上下文、系统集成、可靠性与权限。我们跨越这些边界，让上下文从最初的观察，一直贯穿到经过评估的结果。'))}</div></div><div className="g-shifts">{shifts.map((shift,index)=><article key={shift.title.en}><span className="g-kicker">0{index+1}</span><div><h3>{t(shift.title)}</h3><p>{t(shift.body)}</p></div></article>)}</div></div>
    <div className="g-local sf-workspace" data-story-section="workspace" data-story-media="workspace-1"><div className="sf-local-copy"><h3>{t(tx('Built in Shenzhen. Grounded in domain work.','扎根深圳，立足领域实践。'))}</h3><p>{t(tx('Different domains. Reusable engineering disciplines. We invest in sensing, data pipelines, evaluation and authorized workflows, while keeping expertise and validation specific to each setting. Shenzhen’s hardware and AI collaboration keeps prototyping, model feedback and the supply chain close together.','场景各有不同，工程能力可以复用。我们投入传感、数据管线、评估与授权工作流，同时保留各领域特有的专业知识与验证标准。深圳的硬件与 AI 协作，让原型开发、模型反馈与供应链紧密相连。'))}</p></div></div>
    <details className="g-reading"><summary>{t(tx('Further reading & model-family boundaries','延伸阅读与模型家族边界'))}<span aria-hidden="true">+</span></summary><div><p>{t(tx('World models explore or simulate possible outcomes; vision-language-action (VLA) models address embodied robotic action. They extend the research landscape beyond perception, retrieval and software tool use.','世界模型用于探索或模拟可能结果；视觉—语言—动作（VLA）模型面向具身机器人行动。它们将研究范围拓展到感知、检索与软件工具调用之外。'))}</p><ul><li><a href="https://www.nvidia.com/en-us/ai/cosmos" target="_blank" rel="noreferrer">NVIDIA Cosmos — {t(tx('world foundation models','世界基础模型'))} ↗</a></li><li><a href="https://deepmind.google/models/gemini-robotics/gemini-robotics" target="_blank" rel="noreferrer">Google DeepMind — {t(tx('vision-language-action models','视觉—语言—动作模型'))} ↗</a></li><li><a href="https://deepmind.google/models/gemini-robotics/on-device" target="_blank" rel="noreferrer">Google DeepMind — {t(tx('on-device robotics','端侧机器人模型'))} ↗</a></li><li><a href="https://developers.openai.com/api/docs/guides/agent-builder-safety" target="_blank" rel="noreferrer">OpenAI — {t(tx('agent workflow safety principles','智能体工作流安全原则'))} ↗</a></li></ul></div></details>
   </div></section>

   <section id="people" className="g-people g-section" aria-labelledby="people-title"><div className="g-wrap">
    <div className="g-section-head" data-story-section="heading"><p className="g-kicker">03 / {t(tx('The team','团队'))}</p><div><h2 id="people-title">{t(tx('Different disciplines.','不同的专业，'))}<br/>{t(tx('A shared engineering question.','共同的工程问题。'))}</h2><p>{t(tx('What does it take to make intelligence useful in the physical world? Product, models and experimental systems belong in the same conversation.','如何让智能在真实世界中发挥作用？产品、模型与实验系统，需要共同寻找答案。'))}</p></div></div>
    <div className="g-team-grid">{people.map(person=><a className="g-person" data-story-section="person" href={`/people/${person.id}/?lang=${lang}`} key={person.id}><div className="g-person-image"><img src={`/media/${person.image}`} alt={person.name} loading="lazy" width="400" height="440"/><span><ArrowUpRight size={21}/></span></div><p className="g-kicker">{t(person.role)}</p><h3>{person.name}</h3><span className="g-person-cn">{person.chinese}</span><p>{t(person.short)}</p><span className="g-text-link">{t(tx('Full profile','完整个人介绍'))}<ArrowUpRight size={16}/></span></a>)}</div>
    <ExperimentWorkflow lang={lang}/>
   </div></section>

   <section id="projects" className="g-projects g-section" aria-labelledby="projects-title"><div className="g-wrap">
    <div className="g-section-head" data-story-section="heading"><p className="g-kicker">04 / {t(tx('Our platforms','平台方向'))}</p><div><h2 id="projects-title">{t(tx('Four platforms. One physical-AI approach.','四个平台，同一条物理 AI 路径。'))}</h2><p>{t(tx('Enterprise systems, audio, movement and experimental knowledge. We are building four platforms that connect real-world signals to useful intelligence and action.','企业系统、语音音频、人体运动与实验知识。我们以四个平台，连接真实世界的信号、理解与行动。'))}</p></div></div>
    <div className="g-design-study" data-story-section="nian"><div className="sf-design-copy"><p className="g-kicker">{t(tx('Design × engineering','设计 × 工程'))}</p><h3>{t(tx('A small object. A connected system.','小小载体，相连系统。'))}</h3><p>{t(tx('Nian brings the group’s capture-to-context approach into a personal device. Explore how the enclosure, sensing layers and electronics fit together.','Nian 将集团从采集到上下文的技术路径，融入个人设备。探索外壳、感应层与电子组件如何协同工作。'))}</p><a className="g-text-link" href={`/?showcase=nian&lang=${lang}`}>{t(tx('Explore Nian','探索 Nian'))}<ArrowUpRight size={17}/></a></div><div className="sf-nian-pair"><StoryMedia id="nian-1" lang={lang}/><StoryMedia id="nian-use" lang={lang}/></div></div>
    <div className="g-project-list">{projects.map(project=><article className="g-project" data-story-section="project" id={project.id} data-project={project.id} key={project.id}>
     <figure className="g-project-image logo"><img src={project.image} alt={project.alt} loading="lazy" width="180" height="112"/></figure>
     <div className="g-project-description"><p className="g-kicker">{t(project.layer)}</p><h3>{project.name}</h3><p>{t(project.body)}</p></div>
     <div className="g-project-action"><a href={`/?showcase=${project.route}&lang=${lang}`}>{t(project.action)}<ArrowUpRight size={17}/></a></div>
    </article>)}</div>
   </div></section>
   <section id="contact" className="g-contact" data-story-section="contact" aria-labelledby="contact-title"><div className="g-wrap"><div><p className="g-kicker">{t(tx('Start with a real problem','从真实问题开始'))}</p><h2 id="contact-title">{t(tx('What is worth connecting?','什么值得被连接？'))}</h2><p>{t(tx('For domain collaborators, engineering partners and teams with a workflow worth improving. Let’s define the evidence and the outcome together.','欢迎领域专家、工程伙伴及希望改进具体流程的团队。一起定义所需的证据与值得实现的结果。'))}</p></div><a href="mailto:mliu@szkl.com" className="g-contact-link">mliu@szkl.com<ArrowUpRight size={24}/></a></div></section>
  </main>
  <footer className="g-footer g-wrap"><a href={`/?lang=${lang}`}><img src="/brand/szkl-logo-black.png" alt="SZKL" width="100" height="25"/></a><div>Shenzhen Knowledge Labs<span>{t(tx('Hardware. Intelligence. Accountable action.','硬件。智能。可复核的行动。'))}</span></div><span>© {new Date().getFullYear()} SZKL</span></footer>
 </div>;
}
