import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Review is the default. Set both values explicitly for an approved public launch.
const origin = new URL(process.env.SITE_ORIGIN || 'https://szkl-physical-ai-review.mike944718.chatgpt.site').origin;
const indexable = process.env.SITE_INDEXING === 'allow';
const robots = indexable ? 'index,follow' : 'noindex,nofollow';
const directories = [];
for (const directory of ['dist', 'dist/client']) {
  try {
    await access(join(directory, 'index.html'));
    directories.push(directory);
  } catch { /* A portable static build has no dist/client directory. */ }
}
if (!directories.length) throw new Error('Missing built index.html; run the Vite build first.');

for (const directory of directories) {
  const html = (await readFile(join(directory, 'index.html'), 'utf8'))
    .replace(/(<meta name="robots" content=")[^"]*("\s*\/?\s*>)/, `$1${robots}$2`);
  await writeFile(join(directory, 'index.html'), html);
  for (const [id, name] of [['michael', 'Michael Liu'], ['ethan', 'Ethan Zhang, PhD'], ['louis', 'Louis Zhang, PhD']]) {
    const title = `${name} | SZKL`;
    const profile = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace('</head>', `<meta property="og:title" content="${title}"/><meta property="og:type" content="profile"/><meta property="og:url" content="${origin}/people/${id}/"/><meta property="og:image" content="${origin}/media/${id}.jpg"/></head>`);
    await mkdir(join(directory, 'people', id), { recursive: true });
    await writeFile(join(directory, 'people', id, 'index.html'), profile);
    const cardPath = join(directory, 'contacts', `${id}.vcf`);
    const card = await readFile(cardPath, 'utf8');
    await writeFile(cardPath, card.replace(/^URL:[^\r\n]*/m, `URL:${origin}/people/${id}/`));
  }
  await writeFile(join(directory, 'robots.txt'), `User-agent: *\n${indexable ? 'Allow: /' : 'Disallow: /'}\n`);
}
console.log(`Built profile routes in ${directories.join(' and ')}; indexing ${indexable ? 'allowed' : 'disabled'}.`);
