export const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
export const phx = t => `<mark class="ph">${esc(t)}</mark>`;
export const ph = (c, k) => phx(c.legal[k]);
export const mail = c => c.email.startsWith('[') ? phx(c.email) : `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`;

export const SERVICES = [
  ['desarrollo-web', 'Diseño y desarrollo web'], ['bots-discord', 'Bots de Discord'],
  ['paneles-administracion', 'Paneles de administración'], ['automatizaciones', 'Automatizaciones e integraciones'],
  ['mantenimiento', 'Mantenimiento y soporte']];
export const LEGAL = [
  ['aviso-legal', 'Aviso legal'], ['privacidad', 'Política de privacidad'], ['cookies', 'Política de cookies'],
  ['condiciones-de-uso', 'Condiciones de uso'], ['condiciones-de-contratacion', 'Condiciones de contratación'],
  ['propiedad-intelectual', 'Propiedad intelectual y licencias'], ['seguridad', 'Seguridad y vulnerabilidades']];
const NAV = [['/servicios/', 'Servicios'], ['/proyectos/', 'Proyectos'], ['/sobre-nosotros/', 'Sobre nosotros'], ['/contacto/', 'Contacto']];

// Añade ids a los h2 y devuelve índice + contenido (páginas legales largas)
export function withToc(html) {
  const items = []; let n = 0;
  const body = html.replace(/<h2>(.*?)<\/h2>/g, (_, t) => { const id = 's' + (++n); items.push(`<li><a href="#${id}">${t.replace(/<[^>]+>/g, '')}</a></li>`); return `<h2 id="${id}">${t}</h2>`; });
  return `<nav class="toc" aria-label="Índice de esta página"><p class="toc-title">Contenido</p><ol>${items.join('')}</ol></nav>${body}`;
}

const logo = (cls, h) => `<picture><source media="(prefers-color-scheme: dark)" srcset="/assets/logos/logotipo-horizontal-blanco.svg"><img class="${cls}" src="/assets/logos/logotipo-horizontal-grafito.svg" alt="Sintaxis Studio" width="${Math.round(h * 1395 / 195)}" height="${h}"></picture>`;

export function layout(c, p) {
  const base = c.url.replace(/\/$/, ''), canon = base + p.path, img = base + '/assets/og-image.png';
  const title = p.path === '/' ? `${c.name} · ${c.tagline}` : `${p.title} · ${c.name}`;
  const nav = NAV.map(([h, t]) => `<li><a href="${h}"${p.path.startsWith(h) ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  const ld = p.jsonld ? `<script type="application/ld+json">${JSON.stringify(p.jsonld)}</script>` : '';
  return `<!doctype html>
<html lang="es-ES">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(p.desc)}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canon}">`}
<meta property="og:type" content="website"><meta property="og:site_name" content="${c.name}"><meta property="og:locale" content="es_ES">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${canon}"><meta property="og:image" content="${img}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(p.desc)}"><meta name="twitter:image" content="${img}">
<meta name="theme-color" content="#F5F7FA" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#101216" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css">
${ld}
<script src="/assets/js/main.js" defer></script>${p.script ? `<script src="/assets/js/${p.script}" defer></script>` : ''}
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
<header class="site-header"><div class="wrap bar">
<a class="brand" href="/" aria-label="Sintaxis Studio, inicio">${logo('logo', 28)}</a>
<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="sr">Menú</span><span aria-hidden="true" class="burger"></span></button>
<nav id="site-nav" aria-label="Principal"><ul>${nav}</ul><a class="btn primary small" href="/contacto/">Solicitar proyecto</a></nav>
</div></header>
<main id="main" tabindex="-1">
${p.body}
</main>
<footer class="site-footer"><div class="wrap">
<div class="foot-grid">
<div><a class="brand" href="/" aria-label="Sintaxis Studio, inicio">${logo('logo', 26)}</a><p class="muted">${c.tagline}</p><p class="muted small-text">Contacto: ${mail(c)}</p></div>
<div><p class="foot-title">Servicios</p><ul>${SERVICES.map(([s, t]) => `<li><a href="/servicios/${s}/">${t}</a></li>`).join('')}</ul></div>
<div><p class="foot-title">Estudio</p><ul><li><a href="/proyectos/">Proyectos</a></li><li><a href="/sobre-nosotros/">Sobre nosotros</a></li><li><a href="/contacto/">Contacto</a></li></ul></div>
<div><p class="foot-title">Legal</p><ul>${LEGAL.map(([s, t]) => `<li><a href="/${s}/">${t}</a></li>`).join('')}</ul></div>
</div>
<p class="muted small-text copy">© ${new Date().getFullYear()} Sintaxis Studio. Esta web no utiliza cookies de análisis ni publicidad; consulta la <a href="/cookies/">política de cookies</a>.</p>
</div></footer>
</body>
</html>`;
}
