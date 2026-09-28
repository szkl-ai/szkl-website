import GroupHome from './GroupHome';
import LegacyApp from './LegacyApp';
import VisualGallery from './VisualGallery';

/** Keep established profile and showcase experiences separate from the group homepage. */
export default function App() {
 const params = new URLSearchParams(location.search);
 const isProfile = /^\/people\/(michael|ethan|louis)\/?$/.test(location.pathname);
 if (!isProfile && params.has('visual-studies')) return <VisualGallery />;
 return isProfile || params.get('showcase') ? <LegacyApp /> : <GroupHome />;
}
