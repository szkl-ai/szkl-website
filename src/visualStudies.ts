import {tx} from './content';

/** Generated concepts illustrate engineering directions, not deployments or measured results. */
export const visualStudies = [
 {id:'motion-1',category:'motion',title:tx('Human motion, made legible','让人体动作清晰可读'),alt:tx('Concept visualization of human movement with pose landmarks and vector trajectories in a multipurpose studio','多用途空间中结合姿态关键点与向量轨迹的人体运动概念可视化')},
 {id:'motion-2',category:'motion',title:tx('Objects in context','理解物体与场景'),alt:tx('Object-tracking concept with component trajectories, spatial coordinates and robotic handling','展示零件轨迹、空间坐标与机械取放的物体追踪概念图')},
 {id:'motion-3',category:'motion',title:tx('A shared spatial understanding','共享的空间理解'),alt:tx('Multi-view tracking concept linking people, objects and movement paths in an open interior','在开放空间中关联人员、物体与移动路径的多视角追踪概念图')},
 {id:'knowledge-1',category:'knowledge',title:tx('Inside the neural network','走进神经网络'),alt:tx('Technical neural-network visualization with layered node planes, weighted connections and a highlighted activation path','展示分层节点平面、加权连接与高亮激活路径的技术神经网络可视化')},
 {id:'knowledge-2',category:'knowledge',title:tx('Context in vector space','向量空间中的上下文'),alt:tx('Vector-retrieval concept with coordinate axes, a query vector, neighbor connections and an embedding index','展示坐标轴、查询向量、近邻连接与嵌入索引的向量检索概念图')},
 {id:'knowledge-3',category:'knowledge',title:tx('Records. Relations. Vectors.','记录、关系与向量'),alt:tx('Layered AI-memory concept connecting source records, semantic relations and vector representations','连接来源记录、语义关系与向量表示的分层 AI 记忆概念图')},
 {id:'hardware-1',category:'hardware',title:tx('Engineered from the board up','从电路板开始构建'),alt:tx('SZKL-branded custom PCB concept with dense signal routing, processing components and connectors','带 SZKL 标识的定制 PCB 概念图，展示高密度信号布线、处理器件与连接器')},
 {id:'hardware-2',category:'hardware',title:tx('Capture meets edge compute','采集与端侧计算相连'),alt:tx('Engineering concept of a coordinated family of video capture, sensor and edge-compute devices','视频采集、传感与端侧计算设备协同工作的工程概念图')},
 {id:'hardware-3',category:'hardware',title:tx('From the edge to the system','从端侧连接系统'),alt:tx('Compact edge and server hardware concept with circuit boards, cooling and physical connectivity','展示电路板、散热与物理连接的小型端侧及服务器硬件概念图')},
 {id:'nian-1',category:'nian',title:tx('Nian, layer by layer','念，层层展开'),alt:tx('Horizontal Nian exploded concept distinguishing touch and microphone flex, main PCB, wrapped battery and rear housing','横向展开的 Nian 爆炸概念图，区分触控与麦克风柔性电路、主 PCB、包覆电池及后壳')},
 {id:'nian-use',category:'nian',title:tx('Present in the conversation','专注当下的对话'),alt:tx('Existing Nian lifestyle concept: a professional wears the small graphite pendant during a customer conversation','既有 Nian 使用场景概念图：专业人士佩戴小巧的石墨色挂件，与客户交谈')},
 {id:'workspace-1',category:'workspace',title:tx('Where disciplines work together','让不同专业共同工作'),alt:tx('Aspirational SZKL engineering workspace concept with hardware benches, 3D printers, software stations and servers','集合硬件工作台、3D 打印机、软件工位与服务器的 SZKL 愿景工程空间概念图')},

 {id:'workspace-3',category:'workspace',title:tx('Software within reach of hardware','让软件贴近硬件'),alt:tx('Aspirational SZKL software and edge-compute studio beside an instrument bench','软件与端侧计算工位毗邻仪器工作台的 SZKL 愿景空间概念图')},
] as const;
export type VisualStudyId = typeof visualStudies[number]['id'];
const revisedIds: readonly VisualStudyId[] = ['knowledge-1'];
export const visualReviewStatus = (id:VisualStudyId) => revisedIds.includes(id) ? 'revised' : 'retained';
