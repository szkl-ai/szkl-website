import {useState} from 'react';
import {ArrowRight, ArrowUpRight, Database, GitBranch, ShieldCheck, RefreshCw, ClipboardList, CircleHelp} from 'lucide-react';
import {tx, type Lang, type Text} from './content';

const focus = [
 {id:'pulse', number:'01', name:'Pulse', kind:tx('Enterprise workflows','企业工作流程'),
  title:tx('Investigate the exception. Improve the response.','查清异常，让处置更有效。'),
  body:tx('A focused entry into manufacturing: connect quality and process records, ask for missing context, and prepare evidence-backed actions for engineering review.','从制造业的具体问题切入：连接质量与工艺记录，补充现场上下文，为工程师准备有证据支撑的行动建议。'),
  customer:tx('Quality, process and operations teams','质量、工艺与运营团队'),
  value:tx('Less investigation work. A response that can be checked.','减少排查工作，让处置结果可验证。'),
  route:tx('Start with a scoped paid pilot. Reuse validated connectors and investigation workflows across similar deployments.','以范围明确的付费试点起步，将验证过的连接器和排查流程复用于相近场景。'),
  status:tx('Manufacturing product direction · pilot partners sought','制造业产品方向 · 寻找试点伙伴'),
  cta:tx('Explore the Pulse workflow','了解 Pulse 工作流程')},
 {id:'rallo', number:'02', name:'RALLO', kind:tx('Court intelligence','球场智能'),
  title:tx('From a court session to a reason to return.','让每次上场，都有值得回来的理由。'),
  body:tx('A venue-led sports product, starting with badminton. Turn match footage into rallies and movement players can review, then develop useful highlights and coaching tools.','从羽毛球切入，以场馆为触点，将比赛录像转化为可复盘的回合与动作，逐步完善集锦和教练工具。'),
  customer:tx('Venues, players and coaches','场馆、球员与教练'),
  value:tx('Useful match review. A service players come back for.','有用的比赛复盘，让球员愿意持续使用。'),
  route:tx('Test repeat use and venue economics in pilots before expanding the installation network or adding more sports.','先在试点中验证复用率与场馆经济性，再扩展安装网络及运动项目。'),
  status:tx('Tracking demo available · club pilot development','已有追踪演示 · 球馆试点开发中'),
  cta:tx('Explore the RALLO demo','查看 RALLO 演示')}
];

export function CommercialFocus({lang,onSelect}:{lang:Lang;onSelect:(id:string)=>void}){
 const t=(v:Text)=>v[lang];
 return <section className="commercial-focus section wrap" id="focus">
  <div className="section-heading"><p className="eyebrow">{t(tx('Our focus','当前重点'))}</p><h2>{t(tx('One thesis. Two focused paths.','一个方向，两个重点。'))}</h2><p>{t(tx('Enterprise AI leads our commercial focus. A bounded sports pilot explores venue distribution. Each must prove its own customer value and economics.','企业 AI 是商业落地重点；运动业务以限定范围的试点探索场馆分发。两条路径分别验证客户价值与经济性。'))}</p></div>
  <div className="focus-lanes">{focus.map(f=><article className="focus-lane" key={f.id}>
   <div className="lane-index"><span>{f.number} / {t(f.kind)}</span><span>{f.name}</span></div>
   <h3>{t(f.title)}</h3><p>{t(f.body)}</p>
   <dl><div><dt>{t(tx('For','服务对象'))}</dt><dd>{t(f.customer)}</dd></div><div><dt>{t(tx('Customer value','客户价值'))}</dt><dd>{t(f.value)}</dd></div><div><dt>{t(tx('Path to scale','规模化路径'))}</dt><dd>{t(f.route)}</dd></div></dl>
   <p className="lane-status">{t(f.status)}</p>
   <a className="text-link" href={`?lang=${lang}&application=${f.id}#applications`} onClick={e=>{e.preventDefault();onSelect(f.id);document.getElementById('applications')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}>{t(f.cta)}<ArrowUpRight size={18}/></a>
  </article>)}</div>
  <p className="portfolio-note">{t(tx('Our scientific foundation and voice-capture work inform the approach. Shared capabilities support each product; domain expertise, models and customer economics remain specific to the task.','科研积累和语音采集工作为方法提供基础。产品复用共性能力，同时保留各自的领域知识、模型与客户经济性。'))}</p>
 </section>;
}

const compounding = [
 {icon:GitBranch,title:tx('Reusable workflows','可复用的工作流程'),body:tx('Retain tested connectors, domain definitions and review steps. Measure how much less engineering the next similar deployment needs.','积累经过验证的连接器、领域定义和审核步骤，衡量下一次相近部署实际节省的工程投入。')},
 {icon:Database,title:tx('Evidence linked to outcomes','证据关联实际结果'),body:tx('Connect observations, decisions and reviewed results. Approved examples can strengthen evaluation and task-specific models.','关联观察、决策和复核结果，用获准的样本改进评估与任务模型。')},
 {icon:RefreshCw,title:tx('Repeat access through useful products','有用产品带来持续触达'),body:tx('Enterprise integrations and venue relationships can support repeated use. Retention, paid adoption and support costs determine whether that scales.','企业集成与场馆合作有望形成持续使用；能否规模化，取决于留存、付费采用及支持成本。')},
 {icon:ShieldCheck,title:tx('Customer-controlled learning','客户可控的学习机制'),body:tx('Keep data access, retention and reuse explicit. Customer records do not automatically become shared training data.','明确数据访问、留存与复用范围，客户记录不会自动进入共享训练集。')}
];
export function GrowthThesis({lang}:{lang:Lang}){
 const t=(v:Text)=>v[lang];
 return <section className="growth-thesis section wrap" id="thesis">
  <div className="section-heading"><p className="eyebrow">{t(tx('Built for repeatability','围绕复用而构建'))}</p><h2>{t(tx('Make each deployment count.','让每一次落地，都留下积累。'))}</h2><p>{t(tx('The long-term advantage we are building sits around the model: useful capture, connected workflows, reviewed outcomes and customer relationships.','我们希望建立的长期优势，来自模型周围的完整系统：有效采集、相连的工作流程、经过复核的结果，以及客户关系。'))}</p></div>
  <div className="compounding-grid">{compounding.map((x,i)=>{const Icon=x.icon;return <article key={i}><Icon size={24} strokeWidth={1.5}/><h3>{t(x.title)}</h3><p>{t(x.body)}</p></article>})}</div>
  <div className="shared-engine"><div><p className="eyebrow">{t(tx('Shared engineering, specialised products','共用工程能力，专注各自场景'))}</p><h3>{t(tx('Choose models by the work they do.','按任务，选择合适的模型。'))}</h3><p>{t(tx('Use established language, vision and speech models where they work well. Develop specialised capabilities where real evaluation shows a gap. A model change must pass the task’s quality, cost and deployment checks.','成熟的语言、视觉与语音模型适合时直接使用；真实评估发现缺口时，再开发专用能力。更换模型须通过任务质量、成本及部署要求的验证。'))}</p></div><div className="shared-stack"><span>{t(tx('Capture & integration','采集与集成'))}</span><span>{t(tx('Context & permissions','上下文与权限'))}</span><span>{t(tx('Model routing & evaluation','模型路由与评估'))}</span><span>{t(tx('Deployment & monitoring','部署与监测'))}</span><span>{t(tx('Reviewed outcome records','经复核的结果记录'))}</span></div></div>
  <div className="proof-path"><h3>{t(tx('Progress is measured in customer proof.','用客户证据，衡量进展。'))}</h3><ol>
   <li><span>01</span><div><h4>{t(tx('Prove the job','验证任务价值'))}</h4><p>{t(tx('Establish a baseline. Test a specific investigation or court experience with real users.','建立基线，与真实用户验证一项排查任务或球场体验。'))}</p></div></li>
   <li><span>02</span><div><h4>{t(tx('Prove repeatability','验证可重复交付'))}</h4><p>{t(tx('Carry the working approach to another customer. Track quality, adoption and deployment effort.','将有效方法交付给下一位客户，跟踪质量、采用情况和实施投入。'))}</p></div></li>
   <li><span>03</span><div><h4>{t(tx('Earn expansion','以证据支持扩展'))}</h4><p>{t(tx('Expand when repeat use, retained revenue and delivery economics support it.','当持续使用、收入留存与交付经济性得到验证后，再扩展。'))}</p></div></li>
  </ol></div>
  <div className="thesis-connect"><p>{t(tx('For partners and investors who want to build from real deployments.','欢迎关注真实落地的合作伙伴与投资人交流。'))}</p><a className="text-link" href="mailto:mliu@szkl.com?subject=SZKL%20company%20and%20investment%20discussion">{t(tx('Discuss the company direction','交流公司发展方向'))}<ArrowUpRight size={18}/></a></div>
 </section>;
}

const investigation = [
 {label:tx('Gather','取证'),heading:tx('A quality change needs explaining.','一次质量变化，需要解释。'),question:tx('Connect the observation to its production context.','将观察结果与生产上下文关联。'),rows:[
  [tx('Inspection','检测记录'),tx('A soldering defect appears in a production window.','某个生产时段出现焊接缺陷。')],
  [tx('Traceability','追溯记录'),tx('Link affected boards to material lots and process versions.','将受影响电路板关联到物料批次与工艺版本。')],
  [tx('Missing evidence','待补充证据'),tx('Changeover handling has not been recorded.','换线时的具体操作尚未记录。')]],foot:tx('Illustrative records. No live factory is connected.','示例记录，未连接真实工厂。')},
 {label:tx('Ask','询问'),heading:tx('Ask for the fact the system is missing.','补上系统中缺失的现场事实。'),question:tx('“Did storage, handling or setup change during the material changeover?”','“更换物料时，储存、取用方式或设备设置是否发生变化？”'),rows:[
  [tx('Who','询问对象'),tx('The operator or process engineer responsible for the changeover.','负责换线的操作员或工艺工程师。')],
  [tx('How','采集方式'),tx('An approved message or a purposeful voice note.','授权渠道中的消息，或针对问题的语音笔记。')],
  [tx('Record','记录方式'),tx('Keep the source, time and any uncertainty attached.','保留来源、时间及尚不确定的信息。')]],foot:tx('A proposed question; nothing is sent from this demonstration.','这是拟议问题；演示不会发送任何消息。')},
 {label:tx('Assess','分析'),heading:tx('Rank hypotheses. Keep uncertainty visible.','排列假设，保留不确定性。'),question:tx('A nearby material change is a lead to test, not a confirmed cause.','相近时间的物料变更是排查线索，尚不能确认为原因。'),rows:[
  [tx('Material handling','物料处理'),tx('Compare handling records and unaffected boards.','对比处理记录与未受影响电路板。')],
  [tx('Printing process','印刷工艺'),tx('Check stencil cleaning and paste-inspection results.','检查钢网清洁记录与锡膏检测结果。')],
  [tx('Recipe change','配方与参数'),tx('Check recipe versions and equipment settings.','核对工艺版本及设备参数。')]],foot:tx('Hypotheses require an engineer’s review and a suitable test.','假设需要工程师复核，并通过合适的测试验证。')},
 {label:tx('Review','审核'),heading:tx('Prepare the next action for approval.','准备下一步行动，交由负责人审核。'),question:tx('The responsible engineer selects the investigation and containment plan.','由负责工程师确定排查与遏制方案。'),rows:[
  [tx('Proposal','建议'),tx('Inspect the relevant material and compare controlled samples.','检查相关物料，并对比条件受控的样品。')],
  [tx('Authority','权限'),tx('Material holds and process changes follow the plant’s approval rules.','物料隔离与工艺变更遵循工厂审批规则。')],
  [tx('Status','状态'),tx('Awaiting review. No production action has been executed.','待审核，尚未执行任何生产操作。')]],foot:tx('This walkthrough does not approve, quarantine or change anything.','此演示不会审批、隔离物料或修改任何设置。')},
 {label:tx('Verify','验证'),heading:tx('Check the result before closing the case.','先核验结果，再关闭问题。'),question:tx('Agree how success will be measured before applying a change.','实施变更前，先确定如何判断是否有效。'),rows:[
  [tx('Baseline','比较基线'),tx('Compare equivalent products and operating conditions.','比较相同产品及可比运行条件。')],
  [tx('Observation','观察范围'),tx('Use an engineer-defined sample size and monitoring period.','采用工程师确定的样本量和监测时段。')],
  [tx('Learning','经验积累'),tx('Keep the result, counter-evidence and review with the case.','将结果、反向证据与审核意见归入同一案例。')]],foot:tx('Outcome pending. No yield improvement is claimed.','结果待验证，不宣称已经改善良率。')}
];
export function PulseInvestigation({lang}:{lang:Lang}){
 const [step,setStep]=useState(0);const t=(v:Text)=>v[lang];const s=investigation[step];
 return <div className="pulse-investigation">
  <div className="investigation-top"><img src="/brand/pulse-logo-horizontal.png" alt="PULSE — Make Knowledge Count."/><span>{t(tx('Workflow concept','工作流程概念'))}</span></div>
  <div className="investigation-title"><ClipboardList size={20}/><span>{t(tx('SMT / quality investigation','SMT / 质量异常排查'))}</span></div>
  <div className="investigation-tabs" role="tablist" aria-label={t(tx('Investigation stages','排查阶段'))}>{investigation.map((x,i)=><button key={i} id={`investigation-tab-${i}`} type="button" role="tab" aria-selected={step===i} aria-controls="investigation-panel" tabIndex={step===i?0:-1} onClick={()=>setStep(i)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?4:(i+(e.key==='ArrowLeft'?4:1))%5;setStep(n);document.getElementById(`investigation-tab-${n}`)?.focus()}}}><span>0{i+1}</span>{t(x.label)}</button>)}</div>
  <div id="investigation-panel" role="tabpanel" aria-labelledby={`investigation-tab-${step}`} tabIndex={0} className="investigation-panel">
   <h4>{t(s.heading)}</h4><p className="investigation-question"><CircleHelp size={18}/>{t(s.question)}</p>
   <dl>{s.rows.map(([k,v],i)=><div key={i}><dt>{t(k)}</dt><dd>{t(v)}</dd></div>)}</dl>
   <div className="investigation-bottom"><p>{t(s.foot)}</p><button type="button" onClick={()=>setStep((step+1)%5)}>{t(step===4?tx('Start again','重新查看'):tx('Next step','下一步'))}<ArrowRight size={16}/></button></div>
  </div>
 </div>;
}

export function RalloRoute({lang}:{lang:Lang}){
 const t=(v:Text)=>v[lang];const steps=[
  [tx('Capture the session','采集本场比赛'),tx('A fixed camera and a defined recording window.','固定相机，明确录制时段。')],
  [tx('Link the player','关联球员'),tx('Proposed QR and booking-time claim, with permission.','拟通过二维码与预约时间，在授权后认领场次。')],
  [tx('Deliver the review','交付复盘内容'),tx('Rallies and movement, followed by highlights and coach review.','回合与动作复盘，逐步加入集锦与教练点评。')],
  [tx('Prove repeat use','验证持续使用'),tx('Test player return, paid use and the venue’s operating cost.','验证球员回访、付费使用及场馆运营成本。')]
 ];
 return <div className="rallo-route"><h4>{t(tx('A venue-led route to players.','通过场馆，服务球员。'))}</h4><ol>{steps.map(([h,p],i)=><li key={i}><span>0{i+1}</span><h5>{t(h)}</h5><p>{t(p)}</p></li>)}</ol><p className="route-note">{t(tx('Proposed commercial journey. Session matching, payment and coaching are not demonstrated by the tracking viewer. Recording notice, retention and permission for model improvement must be agreed separately.','拟议商业路径。追踪演示不代表已实现场次匹配、付费或教练功能；录制告知、留存及模型改进用途需单独约定。'))}</p></div>;
}
