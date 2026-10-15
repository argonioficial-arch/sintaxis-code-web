// Comprobaciones automáticas sobre dist/: enlaces internos, anclas, H1, títulos, recursos externos y almacenamiento.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(root), htmls = files.filter(f => f.endsWith('.html'));
const exists = u => { const f = path.join(root, u); return fs.existsSync(f) && (fs.statSync(f).isFile() || fs.existsSync(path.join(f, 'index.html'))); };
let errors = 0; const bad = m => { errors++; console.error('✗', m); };
const titles = new Map();
for (const f of htmls) {
  const rel = path.relative(root, f), h = fs.readFileSync(f, 'utf8');
  const h1 = (h.match(/<h1[ >]/g) || []).length; if (h1 !== 1) bad(`${rel}: ${h1} h1`);
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1]; if (!t) bad(`${rel}: sin title`); else if (titles.has(t)) bad(`${rel}: title duplicado con ${titles.get(t)}`); else titles.set(t, rel);
  if (!/name="description" content="[^"]{30,}/.test(h)) bad(`${rel}: description ausente o corta`);
  if (/ style="/.test(h) || /<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>/.test(h)) bad(`${rel}: estilo o script en línea (incompatible con la CSP)`);
  if (/(src|href)="https?:\/\/(?!www\.aepd\.es)/.test(h.replace(/<(link|meta)[^>]*(canonical|og:|twitter:)[^>]*>/g, '').replace(/<script type="application\/ld\+json">.*?<\/script>/g, ''))) bad(`${rel}: recurso o enlace externo no previsto`);
  const ids = new Set([...h.matchAll(/ id="([^"]+)"/g)].map(m => m[1]));
  for (const m of h.matchAll(/(?:href|src|srcset)="([^"#?][^"]*|#[^"]*)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|data:)/.test(u)) continue;
    if (u.startsWith('#')) { if (!ids.has(u.slice(1))) bad(`${rel}: ancla ${u} inexistente`); continue; }
    if (!exists(u.split('#')[0].split('?')[0])) bad(`${rel}: enlace roto ${u}`);
  }
  for (const m of h.matchAll(/<img [^>]*>/g)) if (!/ alt="/.test(m[0]) || !/ width="/.test(m[0]) || !/ height="/.test(m[0])) bad(`${rel}: img sin alt/dimensiones`);
}
for (const f of files.filter(f => /\.(js|css)$/.test(f))) {
  const s = fs.readFileSync(f, 'utf8');
  if (/localStorage|sessionStorage|document\.cookie|indexedDB/.test(s)) bad(`${path.relative(root, f)}: usa almacenamiento/cookies`);
  if (/https?:\/\//.test(s.replace(/\/\/.*$/gm, ''))) bad(`${path.relative(root, f)}: URL externa`);
}
const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const m of sm.matchAll(/<loc>([^<]*)<\/loc>/g)) { const p = new URL(m[1]).pathname; if (!exists(p)) bad(`sitemap: ${p} no existe`); }
console.log(errors ? `\n${errors} problema(s)` : `✓ ${htmls.length} páginas HTML: enlaces, anclas, H1, títulos, CSP y almacenamiento correctos`);
process.exit(errors ? 1 : 0);
