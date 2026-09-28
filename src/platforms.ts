import {tx, type Text} from './content';

/** Platform scope supplied by the owner; maturity labels describe the evidence available today. */
export const platforms: Array<{
 id:string; name:string; image:string; alt:string; layer:Text; status:Text; route:string; body:Text; action:Text;
}> = [
 {id:'pulse', name:'Pulse', image:'/brand/pulse-logo-horizontal.png', alt:'PULSE — Make Knowledge Count.',
  layer:tx('Forward-deployed enterprise AI','FDE · 企业 AI'), status:tx('Enterprise platform in development','企业平台开发中'), route:'pulse',
  body:tx('Forward-deployed AI engineering that connects enterprise knowledge, operational data and business systems. Built around real workflows to support decisions, coordinate work and deliver controlled automation.','以深入业务现场的 AI 工程，连接企业知识、运营数据与业务系统。围绕真实工作流程，支持决策、任务协同与受控自动化。'),
  action:tx('Explore Pulse','了解 Pulse')},
 {id:'rallo', name:'RALLO', image:'/brand/rallo-logo.svg', alt:'RALLO 拉罗',
  layer:tx('Video & movement intelligence','视频与运动智能'), status:tx('Tracking prototype · guidance in development','追踪原型 · 指导能力开发中'), route:'rallo',
  body:tx('Designed to turn video into a structured understanding of human movement: position, speed, technique and interaction. Its scope spans sports and other physical activities, developing statistics, performance feedback and guidance grounded in observed motion.','将视频转化为对人体动作的结构化理解，涵盖位置、速度、技术动作与互动关系。面向体育及其他身体活动，以运动观测为基础，发展量化统计、表现反馈与指导能力。'),
  action:tx('Explore RALLO','了解 RALLO')},
 {id:'phenolab', name:'PhenoLab', image:'/brand/pheno-logo.png', alt:'Pheno',
  layer:tx('Experimental ontology & model integration','实验本体与模型连接'), status:tx('Deployed lab platform · model integration in development','实验平台已部署 · 模型集成开发中'), route:'phenolab',
  body:tx('The data and ontology layer connecting physical experiments with predictive models. Organizes samples, instruments, protocols, conditions and results in a shared semantic structure, so evidence can inform predictions and predictions can guide the next experiment.','连接物理实验与预测模型的数据及本体层。以统一的语义结构关联样品、仪器、流程、条件与结果，让实验证据进入模型，并让模型预测指导下一轮实验。'),
  action:tx('Explore PhenoLab','了解 PhenoLab')},
 {id:'nian', name:'Nian / 念', image:'/brand/nian-logo.svg', alt:'Nian 念',
  layer:tx('Voice & audio intelligence','语音与音频智能'), status:tx('Hardware & application prototype','硬件与应用原型'), route:'nian',
  body:tx('An intelligence layer for everyday audio, turning conversations and voice into contextual knowledge, decisions and actionable items. Connects capture, transcription and semantic understanding so information can be recalled, shared and carried into daily workflows.','面向日常语音与音频的智能层，将对话转化为有上下文的知识、决策与行动事项。贯通采集、转写和语义理解，让信息可回顾、可共享，并接入日常工作流程。'),
  action:tx('Explore Nian','了解 Nian')},
];
