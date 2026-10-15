import { esc, mail, ph, phx, SERVICES } from './layout.mjs';

const PROCESO = [
  ['Contacto y análisis', 'Nos cuentas la necesidad y los objetivos. Te hacemos las preguntas necesarias para entender el alcance.'],
  ['Propuesta por escrito', 'Recibes una propuesta con alcance, entregables, condiciones y presupuesto. Sin compromiso hasta que la aceptes.'],
  ['Acuerdo', 'Se formalizan por escrito las condiciones del encargo antes de empezar a trabajar.'],
  ['Desarrollo con revisiones', 'Trabajamos por fases y te enseñamos el avance para ajustar a tiempo.'],
  ['Entrega y documentación', 'Entregamos lo acordado con la documentación necesaria para usarlo y mantenerlo.'],
  ['Mantenimiento opcional', 'Si lo necesitas, se acuerda un soporte posterior; no es obligatorio.']];
const steps = () => `<ol class="steps">${PROCESO.map(([t, d]) => `<li><strong>${t}</strong>${d}</li>`).join('')}</ol>`;
const ticks = a => `<ul class="ticks">${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const cta = (title, text) => `<section class="section band cta"><div class="wrap narrow"><h2>${title}</h2><p class="lead">${text}</p><a class="btn primary" href="/contacto/">Solicitar un proyecto</a><a class="btn secondary" href="/servicios/">Ver servicios</a></div></section>`;

const DET = {
  'desarrollo-web': {
    lead: 'Páginas web corporativas y personales, claras, rápidas y fáciles de mantener.',
    short: 'Webs corporativas y personales: diseño, desarrollo, textos legales y SEO técnico.',
    incluye: ['Diseño de la estructura y de la interfaz, adaptado a móvil, tablet y ordenador.', 'Desarrollo con HTML semántico, CSS y JavaScript, o con la tecnología que mejor encaje.', 'Formularios con validación y protección contra spam, si se necesitan.', 'Base de SEO técnico: metadatos, sitemap, rendimiento y accesibilidad.', 'Páginas legales de partida (aviso legal, privacidad, cookies), que deben revisarse con los datos reales del titular.'],
    para: 'Pequeños negocios, profesionales y creadores que necesitan presencia web propia, o proyectos que quieren renovar una web existente.',
    info: ['Objetivo de la web y a quién se dirige.', 'Páginas y funciones que imaginas, y ejemplos que te gusten.', 'Contenidos disponibles (textos, logotipo, imágenes) y quién los aportará.', 'Dominio y alojamiento actuales, si los hay.', 'Datos del titular necesarios para los textos legales.']
  },
  'bots-discord': {
    lead: 'Bots a medida para automatizar y dar estructura a tu comunidad de Discord.',
    short: 'Bots a medida: moderación, verificación, comandos, tickets e integraciones.',
    incluye: ['Comandos de barra (slash commands) y flujos adaptados a tu comunidad.', 'Funciones de moderación, verificación, registros o gestión de roles, según lo acordado.', 'Integración con una base de datos o con otras plataformas cuando haga falta.', 'Configuración segura de permisos y de las claves del bot, que nunca se publican en el código.', 'Documentación de comandos y de la puesta en marcha.'],
    para: 'Comunidades, servidores de rol, proyectos de creadores y equipos que quieren ahorrar trabajo manual a su moderación o gestión.',
    info: ['Qué debe hacer el bot, con ejemplos de uso reales.', 'Tamaño aproximado de la comunidad y roles implicados.', 'Dónde se alojará el bot (propio o a acordar).', 'Qué datos de usuarios tratará, para revisar con antelación qué es necesario y su base legal.', 'Si ya existe un bot o código previo que deba mantenerse.']
  },
  'paneles-administracion': {
    lead: 'Paneles para gestionar datos, usuarios y procesos de tu proyecto sin depender de hojas de cálculo.',
    short: 'Paneles de gestión: usuarios, registros, permisos y datos de tu proyecto.',
    incluye: ['Diseño de las pantallas y de los flujos de trabajo de gestión.', 'Control de acceso y permisos por rol cuando el panel es privado.', 'Listados, búsqueda, edición y registro de cambios, según el alcance.', 'Conexión con bots, webs u otras fuentes de datos.', 'Medidas de seguridad apropiadas: validación en servidor, gestión de secretos y mínimos privilegios.'],
    para: 'Proyectos y pequeños negocios que gestionan información de forma manual y necesitan orden, trazabilidad y control de quién ve qué.',
    info: ['Qué datos se gestionarán y quién los usará.', 'Roles y permisos necesarios.', 'Si hay datos personales y de qué tipo.', 'Sistemas con los que debe conectarse.', 'Dónde se alojará y quién lo administrará después.']
  },
  automatizaciones: {
    lead: 'Conectamos las herramientas que ya usas para que las tareas repetitivas se hagan solas.',
    short: 'Automatización de tareas e integraciones entre plataformas y servicios.',
    incluye: ['Análisis del proceso actual y propuesta de qué conviene automatizar.', 'Integraciones entre plataformas mediante sus APIs o webhooks oficiales.', 'Scripts y servicios con registro de errores y avisos.', 'Revisión de qué datos se mueven entre servicios y de las condiciones de cada plataforma.', 'Documentación de cómo funciona y cómo detenerlo o modificarlo.'],
    para: 'Equipos y profesionales que repiten tareas entre varias herramientas y quieren reducir errores y tiempo manual.',
    info: ['Descripción paso a paso del proceso actual.', 'Herramientas y plataformas implicadas, y si ofrecen API.', 'Volumen aproximado de operaciones.', 'Qué datos intervienen y si son personales.', 'Qué debe ocurrir cuando algo falla.']
  },
  mantenimiento: {
    lead: 'Mejora, corrección y soporte para webs, bots y herramientas que ya están en marcha.',
    short: 'Correcciones, actualizaciones y mejoras de proyectos existentes.',
    incluye: ['Revisión inicial del estado del proyecto y de sus dependencias.', 'Corrección de errores y actualización de componentes.', 'Mejoras y nuevas funciones acordadas por separado.', 'Revisión de seguridad básica y de rendimiento.', 'Documentación de lo que se cambia.']
    ,
    para: 'Proyectos propios o de terceros que necesitan cuidado continuo, o que quedaron sin mantenimiento.',
    info: ['Acceso al código y al entorno (se acuerda de forma segura; nunca se envían credenciales por canales abiertos).', 'Tecnologías usadas y estado actual.', 'Problemas conocidos y prioridades.', 'Si buscas ayuda puntual o una colaboración recurrente.', 'Quién tiene hoy los derechos sobre el código.']
  }
};

function servicePage(c, [slug, name]) {
  const d = DET[slug];
  return {
    path: `/servicios/${slug}/`, title: name, desc: d.short,
    body: `<section class="wrap section narrow"><p class="crumbs"><a href="/servicios/">Servicios</a> / ${esc(name)}</p>
<h1>${esc(name)}</h1><p class="lead">${d.lead}</p>
<h2>Qué incluye</h2>${ticks(d.incluye)}
<h2>Para quién es</h2><p>${d.para}</p>
<h2>Qué necesitamos para presupuestarlo</h2>${ticks(d.info)}
<p class="muted">No publicamos precios ni plazos fijos: cada propuesta se calcula según el alcance y los plazos se confirman por escrito en ella.</p>
<a class="btn primary" href="/contacto/?tipo=${slug}">Solicitar propuesta</a></section>
<section class="section band"><div class="wrap"><h2>Cómo trabajamos</h2>${steps()}</div></section>
<section class="wrap section narrow"><h2>Otros servicios</h2>${ticks(SERVICES.filter(s => s[0] !== slug).map(([s, t]) => `<a href="/servicios/${s}/">${t}</a>`))}</section>`
  };
}

const DEMOS = [
  ['Web corporativa de ejemplo', ['HTML', 'CSS', 'JavaScript'], 'Estructura tipo de una web de presentación para un pequeño negocio: servicios, contacto, formulario y textos legales.'],
  ['Bot de moderación para Discord', ['Node.js', 'discord.js'], 'Ejemplo de alcance de un bot con comandos de moderación, registro de acciones y ajustes por servidor.'],
  ['Panel de administración', ['HTML/CSS/JS', 'API'], 'Ejemplo de alcance de un panel privado con roles, listados, búsqueda y registro de cambios.']];

export function pages(c) {
  const home = {
    path: '/', title: c.name,
    desc: 'Sintaxis Studio es un estudio de desarrollo de soluciones digitales: webs, bots de Discord, paneles de administración y automatizaciones.',
    jsonld: { '@context': 'https://schema.org', '@type': 'Organization', name: c.name, url: c.url, logo: c.url.replace(/\/$/, '') + '/assets/logos/favicon-512.png' },
    body: `<section class="hero"><img class="mark" src="/assets/logos/simbolo-azul.svg" alt="" width="560" height="584"><div class="wrap">
<p class="tagline">${c.tagline}</p><h1>Sintaxis Studio</h1>
<p class="lead">Estudio de desarrollo de soluciones digitales: webs, bots de Discord, paneles de administración y herramientas a medida, pensadas para que sean útiles y fáciles de mantener.</p>
<p><a class="btn primary" href="/servicios/">Ver servicios</a><a class="btn secondary" href="/contacto/">Solicitar un proyecto</a></p>
<pre class="code" aria-hidden="true">const estudio = {
  nombre: "Sintaxis Studio",
  enfoque: ["web", "bots", "paneles"],
  principio: "built with purpose",
};</pre></div></section>

<section class="section band"><div class="wrap"><p class="eyebrow">Servicios</p><h2>Qué podemos construir contigo</h2>
<div class="grid">${SERVICES.map(([s, t]) => `<article class="card"><h3>${t}</h3><p class="muted">${DET[s].short}</p><a class="more" href="/servicios/${s}/">Ver servicio<span class="sr"> de ${t}</span></a></article>`).join('')}</div></div></section>

<section class="wrap section"><div class="split"><div><p class="eyebrow">Forma de trabajar</p><h2>Claridad antes, durante y después</h2>
<p class="lead">Un estudio pequeño permite hablar directamente con quien desarrolla. Lo que se acuerda queda por escrito.</p></div>
<div>${ticks(['<strong>Propuesta por escrito</strong> antes de empezar, con alcance y condiciones.', '<strong>Avances visibles</strong>: trabajamos por fases para ajustar a tiempo.', '<strong>Código ordenado y documentado</strong>, pensado para que se pueda mantener.', '<strong>Privacidad desde el diseño</strong>: pedimos solo los datos necesarios y evitamos servicios externos innecesarios.', '<strong>Seguridad básica</strong> aplicada a formularios, accesos y gestión de claves.'])}</div></div></section>

<section class="section band"><div class="wrap"><p class="eyebrow">Proyectos</p><h2>Ejemplos de alcance</h2>
<p class="lead">Aún no mostramos trabajos de clientes. Estas son demostraciones que ilustran el tipo de proyectos que desarrollamos.</p>
<div class="grid">${DEMOS.map(([t, tech, d]) => `<article class="card"><div class="shot" aria-hidden="true"><i></i><i></i><i></i></div><p><span class="tag demo">Demostración</span></p><h3>${t}</h3><p class="muted">${d}</p><p>${tech.map(x => `<span class="tag">${x}</span>`).join('')}</p></article>`).join('')}</div>
<p><a class="btn secondary" href="/proyectos/">Ver proyectos</a></p></div></section>

<section class="wrap section"><p class="eyebrow">Proceso</p><h2>De la idea a la entrega</h2>${steps()}</section>

<section class="section band"><div class="wrap narrow"><p class="eyebrow">Preguntas frecuentes</p><h2>Antes de empezar</h2>
<details><summary>¿Cuánto cuesta un proyecto?</summary><p>Depende del alcance. No publicamos tarifas fijas: tras conocer tu necesidad te enviamos una propuesta por escrito con el presupuesto.</p></details>
<details><summary>¿Cuánto se tarda?</summary><p>Los plazos dependen del proyecto y de la disponibilidad de contenidos. Se confirman en la propuesta, no antes.</p></details>
<details><summary>¿Quién es el propietario del código y del diseño?</summary><p>Lo que corresponde a cada parte se acuerda por escrito para cada encargo. Puedes ver el planteamiento general en <a href="/propiedad-intelectual/">propiedad intelectual y licencias</a>.</p></details>
<details><summary>¿Qué pasa con mis datos si solicito una propuesta?</summary><p>Solo pedimos los datos necesarios para responderte. Tienes el detalle en la <a href="/privacidad/">política de privacidad</a>.</p></details>
<details><summary>¿Ofrecéis mantenimiento después de la entrega?</summary><p>Sí, como servicio opcional y por separado. Consulta <a href="/servicios/mantenimiento/">mantenimiento y soporte</a>.</p></details>
<details><summary>¿Puedo ver trabajos anteriores?</summary><p>Todavía no publicamos casos de clientes. Mostramos demostraciones identificadas como tales; cuando haya casos reales publicables con permiso, aparecerán en <a href="/proyectos/">proyectos</a>.</p></details></div></section>
${cta('¿Tienes un proyecto en mente?', 'Cuéntanos qué necesitas. Te responderemos con preguntas o con una propuesta.')}`
  };

  const servicios = {
    path: '/servicios/', title: 'Servicios', desc: 'Servicios de Sintaxis Studio: desarrollo web, bots de Discord, paneles de administración, automatizaciones y mantenimiento.',
    body: `<section class="wrap section"><p class="eyebrow">Servicios</p><h1>Lo que hacemos</h1><p class="lead">Soluciones digitales a medida para pequeños negocios, profesionales, comunidades y creadores.</p>
<div class="grid">${SERVICES.map(([s, t]) => `<article class="card"><h2 class="h3">${t}</h2><p class="muted">${DET[s].short}</p><a class="more" href="/servicios/${s}/">Ver detalles<span class="sr"> de ${t}</span></a></article>`).join('')}</div></section>
<section class="section band"><div class="wrap"><h2>Cómo trabajamos</h2>${steps()}</div></section>${cta('¿No sabes qué servicio necesitas?', 'Describe tu necesidad y te orientamos.')}`
  };

  const proyectos = {
    path: '/proyectos/', title: 'Proyectos', desc: 'Demostraciones que ilustran el tipo de proyectos de Sintaxis Studio. Aún no se publican trabajos de clientes.',
    body: `<section class="wrap section"><p class="eyebrow">Proyectos</p><h1>Proyectos y demostraciones</h1>
<p class="lead">Todavía no publicamos trabajos de clientes. Las tarjetas siguientes son <strong>demostraciones conceptuales</strong>: ilustran el alcance de cada tipo de proyecto y no corresponden a encargos entregados.</p>
<div class="grid">${DEMOS.map(([t, tech, d]) => `<article class="card"><div class="shot" aria-hidden="true"><i></i><i></i><i></i></div><p><span class="tag demo">Demostración</span></p><h2 class="h3">${t}</h2><p class="muted">${d}</p><p>${tech.map(x => `<span class="tag">${x}</span>`).join('')}</p><p class="muted small-text">Sin enlace público por ahora.</p></article>`).join('')}</div>
<div class="panel"><h2 class="h3">¿Y los casos reales?</h2><p>Cuando existan proyectos publicables, con permiso expreso del cliente y sin información confidencial, se añadirán aquí con sus capturas, tecnologías y enlaces.</p></div></section>${cta('¿Quieres ser el primero?', 'Cuéntanos tu proyecto y valoramos juntos el alcance.')}`
  };

  const sobre = {
    path: '/sobre-nosotros/', title: 'Sobre Sintaxis Studio', desc: 'Filosofía y forma de trabajar de Sintaxis Studio: soluciones útiles, comunicación clara y mantenimiento responsable.',
    body: `<section class="wrap section narrow"><p class="eyebrow">Sobre Sintaxis Studio</p><h1>Tecnología con propósito</h1>
<p class="lead">Sintaxis Studio es un estudio de desarrollo de soluciones digitales. Creemos que una herramienta es buena cuando resuelve un problema real y se puede mantener con el tiempo.</p>
<h2>Filosofía</h2><p>Construimos lo necesario y lo explicamos con claridad. Preferimos una solución sencilla y bien hecha a una compleja que nadie puede mantener. Por eso evitamos dependencias innecesarias y documentamos lo que entregamos.</p>
<h2>Enfoque técnico</h2>${ticks(['Código limpio y organizado, con tecnologías elegidas por su utilidad, no por moda.', 'Seguridad y privacidad desde el diseño: validación en servidor, gestión cuidadosa de claves y mínimos datos.', 'Accesibilidad y rendimiento como parte del trabajo, no como añadido final.'])}
<h2>Comunicación</h2><p>Hablas directamente con quien desarrolla tu proyecto. Las decisiones importantes y las condiciones se dejan por escrito, y si algo no se puede hacer o no conviene, te lo decimos.</p>
<h2>Mantenimiento</h2><p>Un proyecto digital necesita cuidado después de la entrega. Ofrecemos soporte y mejora continua como servicio opcional, acordado de forma transparente.</p>
<h2>Transparencia</h2><p>Somos un estudio pequeño y no inflamos cifras, clientes ni trayectoria. Lo que publicamos en esta web es lo que podemos sostener.</p>
<a class="btn primary" href="/contacto/">Hablemos de tu proyecto</a></section>`
  };

  const opt = (v, t) => `<option value="${v}">${t}</option>`;
  const contacto = {
    path: '/contacto/', title: 'Contacto y solicitud de proyecto', script: 'contact.js',
    desc: 'Solicita una propuesta a Sintaxis Studio: cuéntanos tu proyecto y te responderemos por correo.',
    body: `<section class="wrap section"><div class="split"><div><p class="eyebrow">Contacto</p><h1>Solicita un proyecto</h1>
<p class="lead">Cuéntanos qué necesitas. Solo pedimos los datos imprescindibles para poder responderte.</p>
<h2 class="h3">Qué ocurre después</h2>${ticks(['Revisamos tu solicitud.', 'Te respondemos por correo con preguntas o con una propuesta.', 'No hay compromiso hasta que aceptes una propuesta por escrito.'])}
<p class="muted">También puedes escribirnos a ${mail(c)}.</p></div>
<div class="panel"><noscript><p class="status error">Error: el formulario necesita JavaScript. Puedes escribirnos a ${mail(c)}.</p></noscript>
<form id="contact-form" novalidate data-fallback="${c.email.startsWith('[') ? '' : esc(c.email)}">
<input type="hidden" name="t" value="">
<div class="hp" aria-hidden="true"><label>No rellenar este campo<input type="text" name="web" tabindex="-1" autocomplete="off"></label></div>
<div class="field"><label for="nombre">Nombre o nombre profesional</label><input id="nombre" name="nombre" type="text" required minlength="2" maxlength="100" autocomplete="name" aria-describedby="err-nombre"><p class="err" id="err-nombre"></p></div>
<div class="field"><label for="email">Correo electrónico</label><input id="email" name="email" type="email" required maxlength="200" autocomplete="email" aria-describedby="err-email"><p class="err" id="err-email"></p></div>
<div class="field"><label for="tipo">Tipo de proyecto</label><select id="tipo" name="tipo" required aria-describedby="err-tipo"><option value="">Selecciona una opción</option>${SERVICES.map(([s, t]) => opt(s, t)).join('')}${opt('otro', 'Otro / no lo tengo claro')}</select><p class="err" id="err-tipo"></p></div>
<div class="field"><label for="descripcion">Descripción de la necesidad</label><textarea id="descripcion" name="descripcion" required minlength="20" maxlength="3000" aria-describedby="hint-desc err-descripcion"></textarea><p class="hint" id="hint-desc">Mínimo 20 caracteres. No incluyas contraseñas ni datos sensibles.</p><p class="err" id="err-descripcion"></p></div>
<div class="field"><label for="presupuesto">Presupuesto orientativo <span class="opt">(opcional)</span></label><select id="presupuesto" name="presupuesto">${opt('', 'Prefiero no indicarlo')}${opt('no-se', 'Aún no lo sé')}${opt('menos-500', 'Menos de 500 €')}${opt('500-2000', 'Entre 500 € y 2.000 €')}${opt('2000-5000', 'Entre 2.000 € y 5.000 €')}${opt('mas-5000', 'Más de 5.000 €')}</select></div>
<div class="field"><label for="plazo">Plazo orientativo <span class="opt">(opcional)</span></label><select id="plazo" name="plazo">${opt('', 'Prefiero no indicarlo')}${opt('no-se', 'Aún no lo sé')}${opt('urgente', 'Lo antes posible')}${opt('1-mes', 'En el próximo mes')}${opt('1-3-meses', 'En 1 a 3 meses')}${opt('sin-prisa', 'Sin prisa')}</select></div>
<div class="field"><div class="check"><input id="privacidad" name="privacidad" type="checkbox" required aria-describedby="err-privacidad"><label for="privacidad">He leído la <a href="/privacidad/">información de privacidad</a> y entiendo que mis datos se usarán para responder a esta solicitud.</label></div><p class="err" id="err-privacidad"></p></div>
<p class="hint">Responsable: ${ph(c, 'nombre')}. Finalidad: atender tu solicitud. Más información en la <a href="/privacidad/">política de privacidad</a>.</p>
<div><button class="btn primary" type="submit">Enviar solicitud</button></div>
<p class="status" data-status hidden tabindex="-1" role="status" aria-live="polite"></p>
</form></div></div></section>`
  };

  return [home, servicios, ...SERVICES.map(s => servicePage(c, s)), proyectos, sobre, contacto];
}
