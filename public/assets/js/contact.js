// Formulario de solicitud: validación en cliente + envío a /api/contact (validación real en el servidor).
(function () {
  const f = document.getElementById('contact-form');
  if (!f) return;
  const status = f.querySelector('[data-status]'), btn = f.querySelector('button[type=submit]');
  const fallback = f.dataset.fallback || '';
  f.elements.t.value = String(Date.now());
  const q = new URLSearchParams(location.search).get('tipo');
  if (q && [...f.elements.tipo.options].some(o => o.value === q)) f.elements.tipo.value = q;

  const msgs = {
    nombre: 'indica tu nombre o nombre profesional (mínimo 2 caracteres).',
    email: 'introduce un correo electrónico válido.',
    tipo: 'selecciona el tipo de proyecto.',
    descripcion: 'describe tu necesidad con al menos 20 caracteres.',
    privacidad: 'confirma que has leído la información de privacidad para poder enviar la solicitud.'
  };
  const show = (kind, text) => { status.className = 'status ' + kind; status.textContent = text; status.hidden = false; };
  const field = (k, text) => { const el = f.elements[k], err = document.getElementById('err-' + k); el.setAttribute('aria-invalid', text ? 'true' : 'false'); err.textContent = text ? 'Error: ' + text : ''; };
  const check = () => { let first = null; for (const k in msgs) { const bad = !f.elements[k].checkValidity(); field(k, bad ? msgs[k] : ''); if (bad && !first) first = f.elements[k]; } return first; };

  f.addEventListener('submit', async e => {
    e.preventDefault();
    status.hidden = true;
    const first = check();
    if (first) { show('error', 'Error: revisa los campos marcados antes de enviar.'); first.focus(); return; }
    const data = Object.fromEntries(new FormData(f));
    data.privacidad = f.elements.privacidad.checked;
    btn.disabled = true; btn.textContent = 'Enviando…'; show('info', 'Enviando tu solicitud…');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { f.reset(); f.elements.t.value = String(Date.now()); show('success', 'Solicitud enviada correctamente. Revisaremos tu mensaje y te responderemos por correo.'); status.focus(); }
      else if (r.status === 422 && j.errors) { for (const k in j.errors) field(k, j.errors[k]); show('error', 'Error: revisa los campos marcados.'); }
      else if (r.status === 429) show('error', 'Error: has enviado demasiadas solicitudes seguidas. Inténtalo de nuevo más tarde.');
      else throw new Error('no-disponible');
    } catch (_) {
      show('error', 'Error: no hemos podido enviar la solicitud desde el formulario.' + (fallback ? ' Puedes escribirnos directamente a ' + fallback + '.' : ' Inténtalo de nuevo más tarde.'));
    } finally { btn.disabled = false; btn.textContent = 'Enviar solicitud'; }
  });
})();
