import type {Lang} from './content';
import {visualStudies,type VisualStudyId} from './visualStudies';

/** Editorial artwork stays in the page; review navigation is separate. */
export default function StoryMedia({id,lang,eager=false}:{id:VisualStudyId;lang:Lang;eager?:boolean}) {
 const study=visualStudies.find(item=>item.id===id)!;
 return <figure className={`sf-media sf-media--${id}`} data-story-media={id} data-story-section={`media-${id}`}>
  <div className="sf-media-aperture" data-story-effect="mask"><img src={`/visuals/${id}.webp`} alt={study.alt[lang]} width="1536" height={id==='nian-use'?864:1024} loading={eager?'eager':'lazy'} decoding="async"/></div>
  <figcaption><strong>{study.title[lang]}</strong></figcaption>
 </figure>;
}
