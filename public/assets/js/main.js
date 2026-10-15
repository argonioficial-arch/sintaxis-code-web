// Menú móvil accesible. Sin cookies, sin almacenamiento local, sin terceros.
document.documentElement.classList.add('js');
(function () {
  const t = document.querySelector('.nav-toggle'), n = document.getElementById('site-nav');
  if (!t || !n) return;
  const set = open => { t.setAttribute('aria-expanded', String(open)); n.classList.toggle('open', open); };
  t.addEventListener('click', () => set(t.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && n.classList.contains('open')) { set(false); t.focus(); } });
  n.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
})();
