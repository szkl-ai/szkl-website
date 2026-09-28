import {ArrowDown, CornerUpLeft} from 'lucide-react';
import {tx, type Lang} from './content';
import './experiment-workflow.css';

const steps = [
 {id:'design', title:tx('Design & identify','设计与标识'), details:[tx('Question, variables & controls · sample / batch ID · protocol version','研究问题、变量与对照 · 样品 / 批次编号 · 方案版本')]},
 {id:'execute', title:tx('High-throughput execution','高通量执行'), details:[tx('Handle · dispense · weigh — real equipment shown in the film','取放 · 加样 · 称量 — 对应视频中的真实设备操作')]},
 {id:'capture', title:tx('Capture in context','采集与上下文'), details:[tx('Values, units & timestamps · raw files & run logs','测量值、单位与时间戳 · 原始文件与运行日志'),tx('Instrument settings / calibration · planned vs actual conditions','仪器设置 / 标定 · 计划与实际条件'),tx('Via instrument interface, file import or reviewed entry','通过仪器接口、文件导入或经审核录入')]},
 {id:'qualify', title:tx('Link & qualify','关联与质检'), details:[tx('Experiment / run ID links sample, protocol, instrument & result. Raw files retained; transformations traceable.','实验 / 运行编号关联样品、方案、仪器与结果。保留原始文件，追溯数据转换。'),tx('Check schema, units, completeness & provenance.','检查格式、单位、完整性与来源。')]},
 {id:'learn', title:tx('Learn & decide','学习与决策'), details:[tx('Measured results vs model predictions · assess uncertainty','对比实测结果与模型预测 · 评估不确定性'),tx('Human review → approve the next experiment batch','人工审核 → 批准下一批实验')]},
] as const;

export default function ExperimentWorkflow({lang}:{lang:Lang}) {
 return <section id="experiment-workflow" className="ew-section" aria-labelledby="experiment-title">
  <header className="ew-heading" data-story-section="experiment-heading">
   <p className="g-kicker">{tx('High-throughput experimentation','高通量实验')[lang]}</p>
   <h3 id="experiment-title">{tx('From experiments to evidence.','从实验到证据。')[lang]}</h3>
   <p>{tx('Connect physical execution to traceable data, then use reviewed evidence to shape the next experiment.','将物理执行与可追溯数据关联，让经审核的证据指导下一轮实验。')[lang]}</p>
  </header>
  <div className="ew-overview">
   <figure className="g-lab ew-video" data-story-section="equipment">
    <video controls muted playsInline preload="metadata" poster="/media/pheno-equipment-poster.jpg" width="1280" height="720" aria-label={tx('Pheno high-throughput equipment demonstration','Pheno 高通量设备演示')[lang]} aria-describedby="equipment-description">
     <source src="/media/pheno-high-throughput.mp4" type="video/mp4"/>
     <track key={lang} kind="captions" src={`/media/pheno-equipment-${lang}.vtt`} srcLang={lang==='zh'?'zh-CN':'en'} label={lang==='zh'?'中文画面说明':'English visual description'}/>
     <a href="/media/pheno-high-throughput.mp4">{tx('Open equipment video','打开设备视频')[lang]}</a>
    </video>
    <figcaption>
     <span className="ew-footage-label">{tx('Pheno · real equipment · step 02','Pheno · 真实设备 · 步骤 02')[lang]}</span>
     <p id="equipment-description">{tx('Automated vial handling, dispensing & weighing. Silent footage.','自动样品瓶取放、加样与称量。静音实拍。')[lang]}</p>
    </figcaption>
   </figure>
   <figure className="ew-workflow" data-workflow-chart="integrated" data-story-section="experiment-cycle" aria-labelledby="workflow-title">
    <figcaption className="ew-chart-heading">
     <h4 id="workflow-title">{tx('One connected workflow','一条关联的实验流程')[lang]}</h4>
     <span>{tx('Physical execution → PhenoLab experimental ontology','物理执行 → PhenoLab 实验本体')[lang]}</span>
    </figcaption>
    <ol className="ew-spine" role="list">{steps.map((step,index)=><li key={step.id} data-workflow-step={step.id} data-highlight={step.id==='execute'?'true':undefined}>
     <span className="ew-step-number" aria-hidden="true">0{index+1}</span>
     <div className="ew-step-copy">
      <h5>{step.title[lang]}</h5>
      {step.details.map((detail,i)=><p key={i}>{detail[lang]}</p>)}
      {step.id==='qualify'&&<p className="ew-quality-gate"><span>{tx('Flagged → held for review','标记记录 → 暂存待复核')[lang]}</span><span>{tx('QC passed → versioned dataset','质检通过 → 版本化数据集')[lang]}</span></p>}
     </div>
     {index<steps.length-1&&<ArrowDown className="ew-step-connector" size={13} aria-hidden="true"/>}
    </li>)}</ol>
    <p className="ew-feedback"><CornerUpLeft size={16} aria-hidden="true"/><span>{tx('Approved next batch → back to design','下一批获批实验 → 返回设计')[lang]}</span></p>
   </figure>
  </div>
 </section>;
}
