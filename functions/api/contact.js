// Cloudflare Pages Function: POST /api/contact
// NO está operativa hasta configurar las variables de .env.example (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM).
// Valida en servidor, bloquea spam básico (honeypot + tiempo), limita peticiones (si hay KV) y envía el correo.
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const TIPOS = { 'desarrollo-web': 'Diseño y desarrollo web', 'bots-discord': 'Bots de Discord', 'paneles-administracion': 'Paneles de administración', automatizaciones: 'Automatizaciones e integraciones', mantenimiento: 'Mantenimiento y soporte', otro: 'Otro' };
const PRES = ['', 'no-se', 'menos-500', '500-2000', '2000-5000', 'mas-5000'];
const PLAZ = ['', 'no-se', 'urgente', '1-mes', '1-3-meses', 'sin-prisa'];
const MAX_IP_HOUR = 5;

export function validate(d) {
  const e = {}, s = v => (typeof v === 'string' ? v.trim() : '');
  const nombre = s(d.nombre), email = s(d.email), descripcion = s(d.descripcion);
  if (nombre.length < 2 || nombre.length > 100) e.nombre = 'indica tu nombre o nombre profesional (2 a 100 caracteres).';
  if (email.length > 200 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(email)) e.email = 'introduce un correo electrónico válido.';
  if (!Object.hasOwn(TIPOS, s(d.tipo))) e.tipo = 'selecciona el tipo de proyecto.';
  if (descripcion.length < 20 || descripcion.length > 3000) e.descripcion = 'la descripción debe tener entre 20 y 3000 caracteres.';
  if (d.privacidad !== true) e.privacidad = 'debes confirmar que has leído la información de privacidad.';
  const presupuesto = s(d.presupuesto), plazo = s(d.plazo);
  if (!PRES.includes(presupuesto)) e.presupuesto = 'valor no válido.';
  if (!PLAZ.includes(plazo)) e.plazo = 'valor no válido.';
  return { e, v: { nombre: nombre.replace(/[\r\n]+/g, ' '), email, tipo: s(d.tipo), descripcion, presupuesto, plazo } };
}

async function hash(t) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 32); }

export async function onRequestPost({ request, env }) {
  if (env.SITE_ORIGIN && request.headers.get('origin') !== env.SITE_ORIGIN) return json({ ok: false, code: 'origin' }, 403);
  if (!(request.headers.get('content-type') || '').includes('application/json')) return json({ ok: false, code: 'type' }, 415);
  const raw = await request.text();
  if (raw.length > 10000) return json({ ok: false, code: 'size' }, 413);
  let d; try { d = JSON.parse(raw); } catch { return json({ ok: false, code: 'json' }, 400); }
  if (!d || typeof d !== 'object') return json({ ok: false, code: 'json' }, 400);
  if (d.web) return json({ ok: true });                                   // honeypot: se descarta en silencio
  const el = Date.now() - Number(d.t);
  if (!(el > 3000 && el < 86400000)) return json({ ok: false, code: 'timing' }, 400);
  const { e, v } = validate(d);
  if (Object.keys(e).length) return json({ ok: false, errors: e }, 422);
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) return json({ ok: false, code: 'not_configured' }, 503);
  if (env.RATE_LIMIT) {
    const k = 'rl:' + await hash(request.headers.get('CF-Connecting-IP') || 'x');
    const n = Number(await env.RATE_LIMIT.get(k)) || 0;
    if (n >= MAX_IP_HOUR) return json({ ok: false, code: 'rate' }, 429);
    await env.RATE_LIMIT.put(k, String(n + 1), { expirationTtl: 3600 });
  }
  const text = `Nueva solicitud desde la web\n\nNombre: ${v.nombre}\nCorreo: ${v.email}\nTipo: ${TIPOS[v.tipo]}\nPresupuesto: ${v.presupuesto || '-'}\nPlazo: ${v.plazo || '-'}\n\nDescripción:\n${v.descripcion}\n`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: v.email, subject: `Nueva solicitud: ${TIPOS[v.tipo]}`, text })
  });
  if (!r.ok) { console.error('mail provider status', r.status); return json({ ok: false, code: 'mail' }, 502); }   // no se registran datos personales
  return json({ ok: true });
}
