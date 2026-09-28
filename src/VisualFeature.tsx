import type {Lang} from './content';
import {visualStudies,type VisualStudyId} from './visualStudies';

export default function VisualFeature({id,lang,wide=false}:{id:VisualStudyId;lang:Lang;wide?:boolean}) {
 const study=visualStudies.find(item=>item.id===id)!;

 return <figure className={`g-visual${wide?' g-visual-wide':''}`} data-visual={id}>
  <div className="g-visual-frame">
   <img className="g-visual-image" data-parallax src={`/visuals/${id}.webp`} alt={study.alt[lang]} width="1536" height={id==='nian-use'?864:1024} loading="lazy" decoding="async"/>
  </div>
  <figcaption><strong>{study.title[lang]}</strong></figcaption>
 </figure>;
}
