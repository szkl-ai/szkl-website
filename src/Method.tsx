import {ArrowRight, ArrowDown, ArrowUpRight, Radio, Cpu, Workflow, CornerDownRight} from 'lucide-react';
import {tx, type Lang} from './content';

export const capabilities = [
  {
    id: 'capture', number: '01', title: tx('Capture', '采集'),
    summary: tx('Make the physical world readable.', '让真实世界成为可读的数据。'),
    input: tx('Voice · vision · instruments', '语音 · 视觉 · 仪器'),
    output: tx('Signals with source and context', '带有来源与上下文的信号'),
    strength: tx('Hardware team + China’s supply chain', '硬件团队 + 中国供应链'),
    headline: tx('Build the right way to sense.', '从现场需求，设计采集方式。'),
    body: tx('Useful AI starts with useful data. We design the device, placement and data path together, so the system captures what the task actually needs.', '有用的 AI，始于有用的数据。我们把设备、安装位置和数据链路一起设计，围绕实际任务确定采集内容。'),
    advantage: tx('Our in-house hardware team works close to Shenzhen’s component suppliers, prototyping partners and manufacturing ecosystem. Hardware and AI engineers can refine the capture setup together, from an early prototype to a design that can be manufactured.', '我们的自有硬件团队扎根深圳，贴近元器件供应商、打样伙伴与制造生态。硬件和 AI 工程师共同优化采集方案，从早期原型逐步走向可制造的设计。'),
    stack: tx('Microphones and cameras · sensor and instrument interfaces · embedded firmware · data synchronisation', '麦克风与相机 · 传感器及仪器接口 · 嵌入式固件 · 数据同步'),
    deliver: tx('A capture system designed around the setting, with data linked to its source and time.', '适应现场的采集系统，以及关联来源与时间的数据。'),
  },
  {
    id: 'compute', number: '02', title: tx('Compute', '计算'),
    summary: tx('Turn signals into understanding.', '将信号转化为理解。'),
    input: tx('Recognise · connect · predict', '识别 · 关联 · 预测'),
    output: tx('Structured, source-linked insight', '结构化、可追溯的洞察'),
    strength: tx('Model expertise + domain context', '模型能力 + 领域知识'),
    headline: tx('The right model. The right context.', '让合适的模型，理解具体场景。'),
    body: tx('We combine vision, speech, language and predictive models according to the problem. The job is to connect observations to meaningful entities, events and patterns.', '我们按问题组合视觉、语音、语言和预测模型，将观察结果关联到有意义的对象、事件与规律。'),
    advantage: tx('Our AI team brings experience in forecasting, recommendation, geospatial intelligence and model deployment. We connect established models with domain data, task-specific engineering and evaluation against real examples. Corrections remain part of that process.', 'AI 团队具备预测、推荐、地理空间智能及模型部署经验。我们将成熟模型与领域数据、任务专用工程和真实样本评估结合，并持续纳入人工纠正。'),
    stack: tx('Detection and pose models · speech recognition · retrieval and language models · domain prediction', '检测与姿态模型 · 语音识别 · 检索与语言模型 · 领域预测'),
    deliver: tx('Searchable records, recognised events and contextual predictions, with the evidence available for review.', '可检索的记录、识别出的事件和结合上下文的预测，并保留可供复核的证据。'),
  },
  {
    id: 'act', number: '03', title: tx('Act', '行动'),
    summary: tx('Make the next step useful.', '让下一步真正有用。'),
    input: tx('Recommend · review · carry out', '建议 · 审核 · 执行'),
    output: tx('Decisions and connected workflows', '决策与相连的工作流程'),
    strength: tx('Domain experts + product delivery', '领域专家 + 产品交付'),
    headline: tx('Put intelligence into the user’s work.', '让智能进入用户的实际工作。'),
    body: tx('An insight matters when someone can use it. We turn model outputs into recommendations, prioritised tasks and connected workflows, with review and approval appropriate to the action.', '洞察只有被使用，才会产生价值。我们把模型输出转化为建议、有优先级的任务和相连的工作流程，并按行动影响设置审核与授权。'),
    advantage: tx('Product engineers work with users and domain experts to define the decision, the evidence needed and what happens next. Our forward-deployed approach connects that output to the customer’s tools and responsibilities, then uses reviewed outcomes to guide the next iteration.', '产品工程师与用户、领域专家共同定义决策、所需证据及后续步骤。通过深入现场的交付方式，将输出接入客户的工具与职责分工，再用经过复核的结果推动迭代。'),
    stack: tx('Recommendation design · workflow integration · human review · outcome feedback', '建议设计 · 工作流程集成 · 人工审核 · 结果反馈'),
    deliver: tx('An actionable next step tied to evidence, an owner and the workflow where it belongs.', '关联证据、负责人和具体工作流程的下一步行动。'),
  },
];

function SignalDiagram(){
 return <svg viewBox="0 0 280 110" aria-hidden="true" className="method-drawing">
  <g className="diagram-lines"><path d="M8 20H37l6-9 7 20 7-29 7 40 7-21 7 8 7-9h26M8 60h20v18H8zM38 52h24v26H38zM72 43h28v35H72zM8 101h102"/><circle cx="29" cy="101" r="4"/><circle cx="63" cy="101" r="4"/><circle cx="96" cy="101" r="4"/>
  <path d="M124 20h22v35h18M124 65h40M124 100h22V75h18"/></g>
  <rect className="diagram-sheet" x="172" y="24" width="94" height="75" rx="3"/>
  <path className="diagram-lines" d="M188 44h60M188 58h42M188 72h60M188 85h29"/>
 </svg>;
}
function ModelDiagram(){
 return <svg viewBox="0 0 280 110" aria-hidden="true" className="method-drawing">
  <g className="diagram-lines"><rect x="8" y="7" width="57" height="28" rx="3"/><rect x="8" y="45" width="57" height="28" rx="3"/><rect x="8" y="83" width="57" height="22" rx="3"/><path d="M20 21h31M20 59h31M20 94h31M65 21h22v34h17M65 59h39M65 94h22V65h17M177 59h27M218 22v74M204 59h14M218 22h21M218 59h21M218 96h21"/></g>
  <rect className="diagram-chip" x="104" y="24" width="73" height="72" rx="3"/>
  <g className="diagram-chip-detail"><path d="M120 44h41v31h-41zM130 35v9M150 35v9M130 75v10M150 75v10M112 52h8M112 67h8M161 52h8M161 67h8"/></g>
  <g className="diagram-nodes"><circle cx="250" cy="22" r="9"/><circle cx="250" cy="59" r="9"/><circle cx="250" cy="96" r="9"/></g>
 </svg>;
}
function ActionDiagram(){
 return <svg viewBox="0 0 280 110" aria-hidden="true" className="method-drawing">
  <g className="diagram-lines"><rect x="10" y="6" width="94" height="98" rx="3"/><path d="M27 26h61M27 41h45M39 62h45M39 85h45M104 55h47M141 45l10 10-10 10M220 36v38"/><circle cx="28" cy="62" r="4"/><circle cx="28" cy="85" r="4"/>
  <rect x="174" y="8" width="93" height="28" rx="3"/><path d="M189 22h62"/><rect x="174" y="74" width="93" height="28" rx="3"/><path d="M189 88h62"/></g>
  <circle className="diagram-nodes" cx="220" cy="55" r="7"/>
 </svg>;
}

export function MethodHero({lang}:{lang:Lang}){
 const t=(x:{en:string;zh:string})=>x[lang];
 return <section className="method-hero wrap" aria-labelledby="method-title">
  <div className="method-intro"><div><p className="eyebrow"><span className="blue-rule"/>Shenzhen Knowledge Labs / {t(tx('Physical AI','真实世界 AI'))}</p><h1 id="method-title">{t(tx('The physical world.','让真实世界，'))}<br/><span>{t(tx('Made actionable.','成为行动的起点。'))}</span></h1><p className="method-formula">{t(tx('Capture','采集'))}<ArrowRight size={16}/>{t(tx('Compute','计算'))}<ArrowRight size={16}/>{t(tx('Act','行动'))}</p></div><div className="method-intro-copy"><p className="lead">{t(tx('We build the complete loop: capture real-world data, compute what it means, and turn that understanding into useful action.','我们构建完整闭环：采集真实世界的数据，计算并理解其意义，再将理解转化为有用的行动。'))}</p><p>{t(tx('Hardware, models and product engineering—designed together from the start.','从一开始，让硬件、模型与产品工程共同设计。'))}</p><a className="text-link" href="#approach">{t(tx('Why SZKL, at every step','每一步，为什么选择 SZKL'))}<ArrowDown size={18}/></a></div></div>
  <div className="method-system" aria-label={t(tx('Capture to compute to action: our physical AI method','从采集、计算到行动：我们的真实世界 AI 方法'))}>
   <div className="system-label"><span>{t(tx('Our method','我们的方法'))}</span><span>{t(tx('One connected system','一个相连的系统'))}</span></div>
   <div className="method-sequence">{capabilities.map((s,i)=><a key={s.id} className="method-step" href={`#${s.id}`}><div className="method-step-title"><span>{s.number}</span><h2>{t(s.title)}</h2><ArrowRight className="method-next" size={22}/></div><p className="method-summary">{t(s.summary)}</p>{i===0?<SignalDiagram/>:i===1?<ModelDiagram/>:<ActionDiagram/>}<div className="diagram-caption">{t(s.input)}</div><div className="method-output"><span>{t(tx('Output','输出'))}</span><strong>{t(s.output)}</strong></div></a>)}</div>
   <div className="method-feedback"><CornerDownRight size={18}/><span>{t(tx('Reviewed outcomes feed the next cycle.','经过复核的结果，为下一轮提供依据。'))}</span></div>
  </div>
  <div className="method-foundations">{capabilities.map(s=><a key={s.id} href={`#${s.id}`}><span>{s.number}</span>{t(s.strength)}<ArrowUpRight size={17}/></a>)}</div>
 </section>;
}

export function CapabilityChapters({lang}:{lang:Lang}){
 const t=(x:{en:string;zh:string})=>x[lang];
 return <section className="capabilities section wrap" id="approach"><div className="section-heading"><p className="eyebrow">{t(tx('Why SZKL','为什么选择 SZKL'))}</p><h2>{t(tx('An advantage at every step.','每一步，都有积累。'))}</h2><p>{t(tx('Close to the hardware. Deep in the data. Present where the work happens.','贴近硬件，深入数据，扎根工作现场。'))}</p></div>
  {capabilities.map((s,i)=>{const Icon=[Radio,Cpu,Workflow][i];return <article className="capability-chapter" id={s.id} key={s.id}>
   <div className="capability-index"><span className="eyebrow">{s.number} / {t(s.title)}</span><Icon size={30} strokeWidth={1.5}/><h3>{t(s.headline)}</h3><p>{t(s.body)}</p></div>
   <div className="capability-detail"><p className="eyebrow">{t(tx('The SZKL advantage','SZKL 的优势'))}</p><h4>{t(s.strength)}</h4><p>{t(s.advantage)}</p><dl><div><dt>{t(tx('What we work with','技术与方法'))}</dt><dd>{t(s.stack)}</dd></div><div><dt>{t(tx('What it delivers','交付给用户'))}</dt><dd>{t(s.deliver)}</dd></div></dl>{i===1&&<p className="capability-note">{t(tx('Model choice follows the task, data and deployment setting. The application examples below show where these capabilities are being used and developed.','模型选择取决于任务、数据和部署环境。下方应用示例展示这些能力的实际使用与开发方向。'))}</p>}</div>
  </article>})}
  <a className="button primary" href="#applications">{t(tx('See the method in practice','查看具体应用'))}<ArrowDown size={18}/></a>
 </section>;
}
