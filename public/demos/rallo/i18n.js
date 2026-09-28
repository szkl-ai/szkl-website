// Keep localization external so the production script-src 'self' policy stays strict.
const query=new URLSearchParams(location.search),lang=query.get('lang')==='zh'?'zh':'en';
document.documentElement.lang=lang==='zh'?'zh-CN':'en';
document.title=lang==='zh'?'RALLO — 动作复盘':'RALLO — Motion review';
document.querySelectorAll('[data-en]').forEach(el=>el.textContent=el.dataset[lang]);
document.getElementById('demo-map').setAttribute('aria-label',lang==='zh'?'球场活动分布热力图':'Court occupancy heatmap');
if(query.has('embed')){document.body.classList.add('embedded');document.querySelector('.language').classList.add('hidden')}
document.querySelectorAll('.language a').forEach(a=>a.classList.toggle('current',a.getAttribute('href')==='?lang='+lang));
window.RalloI18n={t:(zh,en)=>lang==='zh'?zh:en};
window.fmtTime=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
