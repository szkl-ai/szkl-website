type Point={x:number;y:number};
type Neuron={x:number;y:number;z:number;layer:number;index:number};
const W=1280,H=620;
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const mix=(a:Point,b:Point,t:number):Point=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t)});

/** Procedural illustration only: no inference, measurements or live telemetry. */
export function createNeuralPainter(canvas:HTMLCanvasElement){
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return null;
 let seed=71;
 const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const layers:Neuron[][]=[];
 const geometry=[[330,11,3,128],[450,13,5,165],[570,13,7,180],[690,13,5,165],[810,11,3,128]];
 geometry.forEach(([x,rows,cols,extent],layer)=>{
  const nodes:Neuron[]=[];
  for(let row=0;row<rows;row++)for(let col=0;col<cols;col++)nodes.push({x,y:lerp(-extent,extent,row/(rows-1)),z:lerp(-64,64,col/(cols-1)),layer,index:nodes.length});
  layers.push(nodes);
 });
 const edges:{from:number;to:number;layer:number}[]=[];
 layers.slice(0,-1).forEach((nodes,layer)=>nodes.forEach((_,from)=>{for(let k=0;k<3;k++)edges.push({from,to:Math.floor(random()*layers[layer+1].length),layer})}));
 const streams=Array.from({length:420},()=>({phase:random(),spread:random(),lane:Math.floor(random()*3),speed:.17+random()*.12,bright:random()}));
 const cloud=Array.from({length:210},(_,i)=>({angle:random()*Math.PI*2,r:12+random()*55,z:(random()-.5)*90,cluster:i%3,phase:random()*6}));
 const routes=Array.from({length:24},(_,i)=>({nodes:layers.map(layer=>Math.floor(random()*layer.length)),offset:i/24,gold:i%4===0}));
 let width=0,height=0,dpr=1;
 const project=(node:Neuron,t:number):Point=>{
  const angle=.13*Math.sin(t*.24),x=node.x-570;
  const z=node.z*Math.cos(angle)-x*Math.sin(angle);
  return{x:570+x*Math.cos(angle)+node.z*Math.sin(angle)+z*.48,y:310+node.y-z*.31};
 };
 const line=(a:Point,b:Point)=>{ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y)};
 const dot=(p:Point,r:number,color:string)=>{ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill()};
 function resize(){
  const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;dpr=Math.min(devicePixelRatio||1,2);
  const w=Math.max(1,Math.round(width*dpr)),h=Math.max(1,Math.round(height*dpr));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}
 }
 function draw(t:number){
  if(!ctx||!width||!height)return;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#060d13';ctx.fillRect(0,0,width,height);ctx.save();
  if(width<height){ctx.translate(width,0);ctx.rotate(Math.PI/2);ctx.scale(height/W,width/H)}else ctx.scale(width/W,height/H);
  ctx.lineWidth=.65;ctx.strokeStyle='#152431';ctx.beginPath();
  for(let x=30;x<W;x+=40)for(let y=80;y<H-20;y+=40){ctx.moveTo(x,y);ctx.lineTo(x+1,y)}ctx.stroke();
  const positions=layers.map(layer=>layer.map(node=>project(node,t)));
  // Dense, continuously arriving dataset fragments. Three source modalities share the flow.
  for(let lane=0;lane<3;lane++){
   const cy=160+lane*150;
   ctx.strokeStyle='#355366';ctx.lineWidth=.8;
   for(let sheet=2;sheet>=0;sheet--){ctx.strokeRect(38+sheet*7,cy-46-sheet*5,94,77)}
   for(let row=0;row<7;row++)for(let col=0;col<10;col++){
    const energy=(Math.sin(col*1.3+row*.65+t*1.8+lane)+1)/2;
    ctx.fillStyle=`rgba(108,190,225,${.15+energy*.42})`;ctx.fillRect(49+col*7.5,cy-32+row*8,4.4,3.4);
   }
  }
  streams.forEach(s=>{
   const progress=(s.phase+t*s.speed)%1,cy=160+s.lane*150;
   const end=positions[0][Math.floor(s.spread*positions[0].length)];
   const spread=(s.spread-.5)*100*(1-progress);
   const point={x:lerp(140,end.x,progress),y:lerp(cy,end.y,progress)+spread};
   const alpha=.16+.65*Math.sin(progress*Math.PI);
   ctx.fillStyle=`rgba(${s.bright>.88?'249,208,132':'119,201,239'},${alpha})`;ctx.fillRect(point.x,point.y,s.bright>.9?4:2.3,2.3);
   if(s.bright>.83){ctx.strokeStyle=`rgba(134,206,243,${alpha*.5})`;ctx.beginPath();line({x:point.x-8,y:point.y},point);ctx.stroke()}
  });
  // Layer planes and real geometric connection paths, rather than a raster backdrop.
  geometry.forEach(([x,, ,extent],layer)=>{
   const corners=[[-extent-13,-77],[-extent-13,77],[extent+13,77],[extent+13,-77]].map(([y,z])=>project({x,y,z,layer,index:0},t));
   ctx.beginPath();ctx.moveTo(corners[0].x,corners[0].y);corners.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.closePath();
   ctx.fillStyle='rgba(20,39,55,.28)';ctx.fill();ctx.strokeStyle='#2b5068';ctx.lineWidth=.8;ctx.stroke();
  });
  ctx.strokeStyle='rgba(118,185,227,.15)';ctx.lineWidth=.6;ctx.beginPath();
  edges.forEach(e=>line(positions[e.layer][e.from],positions[e.layer+1][e.to]));ctx.stroke();
  // Activations travel through the volume in slow, staggered waves, without flashes.
  layers.forEach((nodes,l)=>nodes.forEach((node,n)=>{
   const energy=Math.pow((Math.sin(t*2.1-l*.92+node.y*.016+node.z*.018)+1)/2,5),p=positions[l][n];
   if(energy>.46){dot(p,5.5+energy*2,`rgba(112,199,251,${energy*.14})`);dot(p,3.2,`rgba(139,217,255,${energy*.35})`)}
   dot(p,1.45+energy*1.1,`rgba(145,218,255,${.37+energy*.63})`);
  }));
  routes.forEach(route=>{
   const phase=(t*.23+route.offset)%1,position=phase*4,segment=Math.min(3,Math.floor(position)),local=position-segment;
   const a=positions[segment][route.nodes[segment]],b=positions[segment+1][route.nodes[segment+1]],p=mix(a,b,local),tail=mix(a,b,Math.max(0,local-.26));
   ctx.strokeStyle=route.gold?'rgba(255,206,118,.88)':'rgba(143,220,255,.76)';ctx.lineWidth=route.gold?1.8:1.25;ctx.beginPath();line(tail,p);ctx.stroke();
   dot(p,route.gold?7:5,route.gold?'rgba(255,196,92,.12)':'rgba(94,193,255,.13)');dot(p,route.gold?2.8:2.1,route.gold?'#ffe4a2':'#c3efff');
  });
  // An evolving embedding cloud communicates representation, not a fabricated score.
  const centers=[{x:973,y:219},{x:1020,y:321},{x:959,y:405}];
  const cloudPositions=cloud.map(c=>{
   const a=c.angle+t*.18,center=centers[c.cluster];return{x:center.x+Math.cos(a)*c.r+c.z*.22,y:center.y+Math.sin(a)*c.r*.68-c.z*.3+Math.sin(t*.65+c.phase)*5};
  });
  ctx.strokeStyle='rgba(116,181,217,.11)';ctx.lineWidth=.7;ctx.beginPath();
  for(let i=0;i<positions[4].length;i+=2)line(positions[4][i],cloudPositions[(i*7)%cloudPositions.length]);
  cloudPositions.forEach((p,i)=>{if(i%3===0)line(p,cloudPositions[(i+6)%cloudPositions.length])});ctx.stroke();
  cloudPositions.forEach((p,i)=>{const energy=(Math.sin(t*1.2+i*.2)+1)/2;dot(p,1.4+energy,`rgba(${i%3===0?'250,209,138':'125,207,253'},${.35+energy*.6})`)});
  for(let out=0;out<3;out++){
   const end={x:1172,y:185+out*125};ctx.strokeStyle='#365668';ctx.lineWidth=.8;ctx.strokeRect(end.x-22,end.y-20,57,40);
   for(let j=0;j<5;j++){ctx.fillStyle=out===2?'#d6bc84':'#88bed7';ctx.fillRect(end.x-12+j*8,end.y+9,4,-(5+(Math.sin(t*.95+j+out)+1)*9))}
   for(let i=0;i<5;i++){
    const start=cloudPositions[out+i*39],progress=(t*.32+i*.2)%1,p=mix(start,{x:end.x-25,y:end.y},progress);
    ctx.strokeStyle='rgba(107,181,219,.14)';ctx.beginPath();line(start,{x:end.x-25,y:end.y});ctx.stroke();dot(p,2.2,'#b6e6ff');
   }
  }
  // A quiet registration baseline anchors the depth without adding interface chrome.
  ctx.strokeStyle='#293c48';ctx.lineWidth=.8;ctx.beginPath();line({x:38,y:571},{x:1210,y:571});ctx.stroke();
  for(const x of[38,330,570,980,1207]){ctx.beginPath();line({x,y:567},{x,y:575});ctx.stroke()}
  ctx.restore();
 }
 return{resize,draw};
}
