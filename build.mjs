// Generador estático sin dependencias. Uso: node build.mjs  ->  dist/
import fs from 'node:fs';
import path from 'node:path';
import { layout } from './src/layout.mjs';
import { pages } from './src/pages.mjs';
import { legal } from './src/legal.mjs';

const c = JSON.parse(fs.readFileSync('src/site.config.json', 'utf8'));
const base = c.url.replace(/\/$/, '');
fs.rmSync('dist', { recursive: true, force: true });
fs.cpSync('public', 'dist', { recursive: true });

const all = [...pages(c), ...legal(c)];
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
for (const p of all) write(p.path === '/' ? 'dist/index.html' : `dist${p.path}index.html`, layout(c, p));

write('dist/404.html', layout(c, {
  path: '/404.html', noindex: true, title: 'Página no encontrada',
  desc: 'La página que buscas no existe o ha cambiado de dirección.',
  body: `<section class="wrap section narrow"><p class="eyebrow">Error 404</p><h1>Esta página no existe</h1>
  <p class="lead">Puede que el enlace esté mal escrito o que la página haya cambiado de sitio.</p>
  <p><a class="btn primary" href="/">Volver al inicio</a> <a class="btn secondary" href="/servicios/">Ver servicios</a></p></section>`
}));

write('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.map(p => `  <url><loc>${base}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
write('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
write('dist/manifest.webmanifest', JSON.stringify({
  name: c.name, short_name: c.name, lang: 'es-ES', start_url: '/', display: 'browser',
  background_color: '#101216', theme_color: '#101216',
  icons: [{ src: '/assets/logos/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/logos/favicon-512.png', sizes: '512x512', type: 'image/png' }]
}, null, 2));

const mailOk = !c.email.startsWith('[');
if (mailOk) {
  const exp = new Date(Date.now() + 300 * 864e5).toISOString();
  write('dist/.well-known/security.txt', `Contact: mailto:${c.email}\nExpires: ${exp}\nPreferred-Languages: es, en\nCanonical: ${base}/.well-known/security.txt\nPolicy: ${base}/seguridad/\n`);
}

// Avisos de lo que falta por configurar
const html = all.map(p => layout(c, p)).join('');
const markers = (html.match(/class="ph"/g) || []).length;
console.log(`OK: ${all.length + 1} páginas generadas en dist/`);
if (c.url.includes('PENDIENTE')) console.warn('AVISO: "url" en src/site.config.json es un marcador (afecta a canonical, sitemap y Open Graph).');
if (!mailOk) console.warn('AVISO: falta el correo de contacto; no se genera security.txt ni enlaces mailto.');
if (markers) console.warn(`AVISO: quedan ${markers} marcadores legales por completar (resaltados en amarillo).`);
