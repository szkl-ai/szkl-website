import {tx,type Lang,type Text} from './content';
import {visualStudies,type VisualStudyId} from './visualStudies';
import './showcase-visuals.css';

type VisualRow={id:VisualStudyId;label:Text;title:Text;body:Text};
const rows:Record<string,VisualRow[]>={
 pulse:[
  {id:'hardware-2',label:tx('01 / Capture architecture','01 / 采集架构'),title:tx('Connect the observation to its source.','让观察连接来源。'),body:tx('Cameras, sensors and instrument interfaces each contribute part of the record. Timing, calibration and device identity make those observations usable together.','相机、传感器与仪器接口各自记录一部分信息。时间同步、标定与设备身份，让不同来源的观察能够共同使用。')},
  {id:'hardware-3',label:tx('02 / Deployment architecture','02 / 部署架构'),title:tx('Place compute where the work needs it.','让计算贴近任务所需。'),body:tx('Local preprocessing can reduce the data that needs to move. Edge and server resources are selected around latency, connectivity, privacy and the models required by the task.','本地预处理可减少需要传输的数据。围绕时延、网络、隐私与任务所需模型，选择端侧与服务器资源。')},
 ],
 rallo:[{id:'motion-3',label:tx('Spatial context','空间上下文'),title:tx('A movement belongs to a place and a sequence.','理解动作，也理解空间与时序。'),body:tx('Positions, trajectories and timing provide different views of the same event. Combining them gives a reviewer context for returning to the original footage.','位置、轨迹与时间提供同一事件的不同视角。将这些信息结合，让复盘者带着上下文回看原始视频。')}],
 nian:[{id:'knowledge-2',label:tx('Retrieval & memory','检索与记忆'),title:tx('Find the context behind a question.','找到问题背后的上下文。'),body:tx('Embeddings organize text by semantic similarity. A query can retrieve related passages; source links and timestamps connect those passages back to the conversation.','嵌入向量按语义相似性组织文本。查询可检索相关片段，再通过来源链接与时间戳，回到原始对话。')}],
 phenolab:[{id:'knowledge-3',label:tx('Experimental knowledge','实验知识'),title:tx('Keep records, relationships and models connected.','让记录、关系与模型相连。'),body:tx('A sample, its protocol and its measured results need stable identities. Explicit relationships preserve scientific context; vector representations provide another route for finding related records.','样品、实验方案与测量结果需要稳定的身份标识。明确的关系保留科研上下文，向量表示则提供查找相关记录的另一条路径。')}],
};
export default function ShowcaseVisuals({kind,lang}:{kind:string;lang:Lang}){
 const items=rows[kind];if(!items)return null;
 return <section className="sv-stories" aria-label={tx('Engineering behind the platform','平台背后的工程')[lang]}>
  {items.map((item,index)=>{const study=visualStudies.find(v=>v.id===item.id)!;return <article className={`sv-story${index%2?' sv-reverse':''}`} key={item.id}><div className="sv-copy"><p className="sv-kicker">{item.label[lang]}</p><h2>{item.title[lang]}</h2><p>{item.body[lang]}</p></div><figure data-story-media={item.id}><img src={`/visuals/${item.id}.webp`} alt={study.alt[lang]} loading="lazy" decoding="async" width="1536" height="1024"/></figure></article>})}
  {kind==='pulse'&&<div className="sv-workspace" data-story-media="workspace-3"><div><p className="sv-kicker">{tx('Engineering together','协同工程')[lang]}</p><h2>{tx('Hardware, models and software share the same problem.','硬件、模型与软件，围绕同一个问题。')[lang]}</h2><p>{tx('Prototype the capture path. Inspect the data. Test the model in its intended workflow. Keeping these disciplines close shortens the feedback loop.','搭建采集原型，检查数据，再把模型放回预期的工作流程中测试。让这些专业紧密协作，缩短反馈链路。')[lang]}</p></div></div>}
 </section>;
}
