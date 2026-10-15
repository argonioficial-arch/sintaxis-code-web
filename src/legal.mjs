import { ph, phx, mail, withToc, LEGAL } from './layout.mjs';

const fecha = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
const wrap = (title, html) => `<section class="wrap section narrow legal"><p class="crumbs"><a href="/">Inicio</a> / ${title}</p><h1>${title}</h1>
<div class="notice"><strong>Borrador pendiente de revisión jurídica.</strong> Los datos resaltados en amarillo deben completarse con información real del titular antes de publicar. Este texto no sustituye el asesoramiento de un profesional. Versión de trabajo del ${fecha}.</div>${withToc(html)}</section>`;
const meta = Object.fromEntries(LEGAL);

export function legal(c) {
  const P = {};

  P['aviso-legal'] = `
<h2>1. Titular del sitio web</h2>
<p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se facilitan los siguientes datos:</p>
<ul><li>Nombre comercial: <strong>Sintaxis Studio</strong>.</li><li>Titular: ${ph(c, 'nombre')}.</li><li>Condición o forma jurídica: ${ph(c, 'forma')}.</li><li>NIF/CIF: ${ph(c, 'nif')}.</li><li>Domicilio o datos de contacto exigibles: ${ph(c, 'domicilio')}.</li><li>Correo electrónico de contacto: ${mail(c)}.</li><li>Datos registrales: ${ph(c, 'registro')}.</li></ul>
<p>«Sintaxis Studio» es un nombre comercial. No implica por sí mismo que exista una sociedad mercantil: el titular es quien se identifica arriba.</p>
<h2>2. Actividad</h2><p>Desarrollo de soluciones digitales: diseño y desarrollo de páginas web, bots de Discord, paneles de administración, automatizaciones e integraciones, herramientas personalizadas, y mantenimiento de proyectos existentes.</p>
<h2>3. Condiciones de acceso y uso</h2><p>El acceso a la web es gratuito. Quien accede se compromete a usarla conforme a la ley, la buena fe y estas condiciones, y a no realizar actividades que dañen, sobrecarguen o impidan su funcionamiento. El uso se regula también en las <a href="/condiciones-de-uso/">condiciones de uso</a>.</p>
<h2>4. Propiedad intelectual e industrial</h2><p>Los contenidos de la web (textos, diseño, código, logotipos y signos distintivos) pertenecen al titular o a terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. No se permite su reproducción, distribución o transformación sin autorización, salvo lo permitido por la ley. Más información en <a href="/propiedad-intelectual/">propiedad intelectual y licencias</a>.</p>
<h2>5. Responsabilidad</h2><p>El titular procura que la información sea exacta y actual, pero no puede garantizar la ausencia de errores ni la disponibilidad ininterrumpida del sitio. No responde de los daños derivados de un uso indebido ni de contenidos de terceros enlazados, en la medida en que la ley lo permita y sin limitar los derechos que correspondan imperativamente a consumidores y usuarios.</p>
<h2>6. Enlaces</h2><p>La web puede contener enlaces a sitios de terceros sobre cuyo contenido y políticas el titular no tiene control. Su inclusión no implica recomendación ni responsabilidad.</p>
<h2>7. Protección de datos y cookies</h2><p>El tratamiento de datos personales se explica en la <a href="/privacidad/">política de privacidad</a>, y el uso de cookies y tecnologías similares, en la <a href="/cookies/">política de cookies</a>.</p>
<h2>8. Legislación aplicable</h2><p>Este aviso se rige por la legislación española. Para cualquier controversia, las partes se someterán a los juzgados y tribunales que resulten competentes conforme a la ley; si el usuario es consumidor, se respetan los fueros imperativos que le correspondan.</p>
<h2>9. Datos pendientes de confirmar por el titular</h2>
<p>Antes de publicar, confirma lo siguiente. Qué datos son exigibles depende de la forma jurídica, de la actividad real y de las circunstancias del titular:</p>
<ul><li>Si la actividad la desarrolla una <strong>persona física</strong> (por ejemplo, como autónomo) o una <strong>sociedad</strong>, y su nombre completo o denominación social.</li><li>NIF/CIF, y datos del Registro Mercantil solo si existe inscripción.</li><li>Domicilio y medios de contacto: la LSSI-CE exige un correo electrónico y un domicilio o dirección de establecimiento cuando se presta un servicio con contraprestación económica; si se trata de un proyecto sin actividad económica todavía, el alcance de la obligación debe valorarse.</li><li>Si el proyecto está en <strong>fase inicial</strong> y todavía no se ha formalizado la actividad económica.</li><li>Autorizaciones o colegiación: no se prevén para esta actividad, pero debe confirmarse.</li></ul>
<p><strong>Si el titular es menor de edad,</strong> deben revisarse con sus representantes legales y, en su caso, con un profesional la capacidad para contratar, cobrar, asumir obligaciones fiscales y formalizar acuerdos. Publicar esta web no autoriza por sí mismo a desarrollar una actividad económica.</p>`;

  P.privacidad = `
<h2>1. Responsable del tratamiento</h2><ul><li>Responsable: ${ph(c, 'nombre')} (nombre comercial: Sintaxis Studio).</li><li>NIF/CIF: ${ph(c, 'nif')}.</li><li>Contacto: ${mail(c)}. Domicilio: ${ph(c, 'domicilio')}.</li></ul>
<h2>2. Qué datos tratamos y cómo</h2>
<p>Esta web no tiene registro de usuarios, comentarios ni suscripciones. Los datos se recogen a través de:</p>
<ul><li><strong>Formulario de contacto y solicitud de proyecto</strong>: nombre o nombre profesional, correo electrónico, tipo de proyecto y descripción (obligatorios); presupuesto y plazo orientativos (opcionales); y la confirmación de que has leído esta información.</li><li><strong>Correos que nos envíes directamente</strong>: los datos que incluyas en ellos.</li><li><strong>Registros técnicos del servidor</strong>: la infraestructura de alojamiento puede registrar datos técnicos de conexión (como la dirección IP) por seguridad y funcionamiento. Proveedor: ${ph(c, 'hosting')}. Debe confirmarse qué registra y durante cuánto tiempo.</li></ul>
<p>No pedimos DNI, dirección particular, teléfono ni otros datos que no sean necesarios.</p>
<h2>3. Finalidades y bases jurídicas</h2>
<table><tr><th>Finalidad</th><th>Base jurídica</th></tr>
<tr><td>Atender tu consulta o solicitud de propuesta y, si procede, preparar un presupuesto.</td><td>Aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD). A confirmar en la revisión jurídica.</td></tr>
<tr><td>Seguridad del sitio y prevención del abuso (por ejemplo, limitar el envío masivo de formularios).</td><td>Interés legítimo del responsable (art. 6.1.f RGPD).</td></tr>
<tr><td>Cumplir obligaciones legales aplicables, si las hubiera.</td><td>Obligación legal (art. 6.1.c RGPD).</td></tr></table>
<p>No enviamos comunicaciones comerciales ni boletines. Si en el futuro se ofreciera una suscripción, sería independiente, opcional y con su propia información y mecanismo de baja.</p>
<h2>4. Obligatoriedad de los datos</h2><p>Nombre, correo, tipo de proyecto y descripción son necesarios para poder responderte; sin ellos no podemos atender la solicitud. Presupuesto y plazo son opcionales.</p>
<h2>5. Destinatarios y proveedores</h2><p>Para gestionar el formulario pueden acceder a los datos proveedores que actúan por cuenta del responsable: alojamiento (${ph(c, 'hosting')}) y envío de correo (${ph(c, 'correoProveedor')}). No cedemos tus datos a otros terceros salvo obligación legal. Debe completarse esta lista con los proveedores realmente contratados y comprobar que existe el correspondiente contrato de encargado del tratamiento (art. 28 RGPD).</p>
<h2>6. Transferencias internacionales</h2><p>${ph(c, 'transferencias')}. Si algún proveedor tratara datos fuera del Espacio Económico Europeo, se indicará aquí el mecanismo de garantía aplicable.</p>
<h2>7. Plazo de conservación</h2><p>Conservaremos tus datos el tiempo necesario para atender la solicitud: ${ph(c, 'conservacion')}. Después, podrán mantenerse bloqueados durante los plazos de prescripción de posibles responsabilidades y se suprimirán a continuación. Si la consulta se convierte en un encargo, la información necesaria se conservará según la relación contractual y las obligaciones legales (por ejemplo, fiscales).</p>
<h2>8. Tus derechos</h2><p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${mail(c)}, indicando el derecho que ejerces. Podemos pedirte que acredites tu identidad. Si consideras que tus derechos no han sido atendidos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener">www.aepd.es</a>).</p>
<h2>9. Seguridad</h2><p>Aplicamos medidas técnicas y organizativas razonables y proporcionadas: conexión cifrada (HTTPS) en producción, validación de los datos en el servidor, acceso restringido a la información y gestión cuidadosa de las claves de los servicios. Ninguna medida elimina todo riesgo.</p>
<h2>10. Menores</h2><p>Esta web no está dirigida a menores de edad y no solicitamos datos de menores de forma intencionada. Si detectamos que un menor ha facilitado datos sin la autorización exigible, los suprimiremos. ${phx('[CONFIRMAR EL PÚBLICO AL QUE SE DIRIGE LA WEB]')}</p>
<h2>11. Decisiones automatizadas y cookies</h2><p>No tomamos decisiones automatizadas ni elaboramos perfiles. Consulta el uso de cookies en la <a href="/cookies/">política de cookies</a>.</p>`;

  P.cookies = `
<h2>1. Qué son las cookies y tecnologías similares</h2><p>Son archivos o mecanismos de almacenamiento que un sitio web puede guardar en tu dispositivo (cookies, almacenamiento local, píxeles u otros).</p>
<h2>2. Qué utiliza esta web</h2>
<p>Según el código de este sitio en la fecha de esta versión, la web <strong>no instala cookies propias ni de terceros, no usa almacenamiento local o de sesión, y no carga scripts, fuentes, mapas, vídeos ni píxeles de terceros</strong>. Las tipografías se sirven desde el propio sitio.</p>
<table><tr><th>Tecnología</th><th>Finalidad</th><th>Consentimiento</th></tr>
<tr><td>Cookies o almacenamiento propio</td><td>Ninguno utilizado</td><td>No aplica</td></tr>
<tr><td>Analítica, publicidad o seguimiento</td><td>Ninguno utilizado</td><td>No aplica</td></tr>
<tr><td>Contenido incrustado de terceros</td><td>Ninguno utilizado</td><td>No aplica</td></tr></table>
<h2>3. Banner de consentimiento</h2><p>Como no se usan tecnologías que requieran consentimiento, esta web no muestra banner de cookies. Si en el futuro se incorporase analítica u otro servicio que lo exigiera, se añadirá antes un sistema con las opciones Aceptar, Rechazar y Configurar al mismo nivel, sin activar nada antes del consentimiento y con acceso permanente desde el pie de página.</p>
<h2>4. Registros del servidor</h2><p>El proveedor de alojamiento (${ph(c, 'hosting')}) puede registrar datos técnicos de conexión. No son cookies; se explican en la <a href="/privacidad/">política de privacidad</a>. Además, el proveedor puede aplicar sus propias cookies técnicas de seguridad: debe verificarse en el entorno real de publicación.</p>
<h2>5. Cómo comprobarlo y gestionar cookies</h2><p>Puedes ver qué almacena un sitio en las herramientas de desarrollo de tu navegador (pestaña «Aplicación» o «Almacenamiento») y borrar o bloquear cookies en su configuración.</p>
<h2>6. Comprobación pendiente antes de publicar</h2><p>Revisar en el dominio real, con el alojamiento y la configuración finales, que no aparecen cookies ni peticiones a terceros. Si aparecen, esta política debe actualizarse.</p>`;

  P['condiciones-de-uso'] = `
<h2>1. Objeto y ámbito</h2><p>Estas condiciones regulan la navegación y el uso de este sitio web. No regulan la contratación de servicios, que se acuerda aparte (ver <a href="/condiciones-de-contratacion/">condiciones de contratación</a>).</p>
<h2>2. Aceptación y uso correcto</h2><p>Al usar la web aceptas estas condiciones. Te comprometes a usarla de forma lícita y respetuosa y a no introducir datos falsos o de terceros sin legitimación en el formulario.</p>
<h2>3. Usos prohibidos</h2><ul><li>Intentar acceder sin autorización a sistemas, datos o cuentas.</li><li>Realizar ataques, pruebas intrusivas o acciones que sobrecarguen el servicio.</li><li>Enviar spam, código malicioso o contenido ilícito mediante los formularios.</li><li>Reproducir o explotar los contenidos sin autorización.</li></ul>
<p>Si encuentras una vulnerabilidad, consulta el <a href="/seguridad/">canal de seguridad</a>.</p>
<h2>4. Propiedad intelectual</h2><p>Se aplica lo indicado en el <a href="/aviso-legal/">aviso legal</a> y en <a href="/propiedad-intelectual/">propiedad intelectual y licencias</a>.</p>
<h2>5. Disponibilidad y cambios</h2><p>La web puede modificarse, actualizarse o interrumpirse temporalmente por mantenimiento o por causas ajenas. El titular puede cambiar estas condiciones; la versión vigente es la publicada en cada momento.</p>
<h2>6. Enlaces a terceros</h2><p>Los enlaces a otros sitios se ofrecen como referencia. El titular no controla ni responde de sus contenidos o políticas.</p>
<h2>7. Responsabilidad</h2><p>La información de la web es orientativa y no constituye una oferta vinculante. El titular no responde de los daños que se deriven de un uso indebido, en la medida permitida por la ley y sin afectar a los derechos imperativos de los consumidores.</p>
<h2>8. Protección de datos</h2><p>Consulta la <a href="/privacidad/">política de privacidad</a> y la <a href="/cookies/">política de cookies</a>.</p>
<h2>9. Legislación y conflictos</h2><p>Se aplica la legislación española. Los conflictos se someterán a los tribunales competentes, respetando los derechos imperativos del consumidor, incluida su facultad de acudir a los tribunales de su domicilio cuando la ley se la reconozca.</p>`;

  P['condiciones-de-contratacion'] = `
<h2>1. Alcance de esta página</h2><p>Esta web <strong>no es una tienda online</strong>: no permite contratar ni pagar servicios directamente. Solo recoge solicitudes de propuesta. Esta página explica cómo se desarrolla el proceso; las condiciones definitivas de cada encargo se acuerdan por escrito antes de empezar el trabajo.</p>
<h2>2. Proceso</h2><ol><li><strong>Solicitud</strong>: envías el formulario o un correo. No supone ningún compromiso.</li><li><strong>Propuesta y presupuesto</strong>: te enviamos por escrito el alcance, los entregables, el precio, los plazos y las condiciones.</li><li><strong>Aceptación y formalización</strong>: el encargo solo comienza cuando ambas partes aceptan por escrito la propuesta o firman el acuerdo correspondiente.</li><li><strong>Desarrollo y entrega</strong>: se trabaja por fases y se entrega lo acordado.</li></ol>
<h2>3. Precios, impuestos y facturación</h2><p>Los precios figuran en la propuesta, con indicación de si incluyen impuestos. La facturación y los impuestos aplicables dependen de la condición del titular y del cliente: ${phx('[RÉGIMEN FISCAL Y DATOS DE FACTURACIÓN A CONFIRMAR]')}. Las formas y los hitos de pago se acuerdan en la propuesta.</p>
<h2>4. Plazos</h2><p>No se prometen plazos en esta web. Los plazos se fijan en la propuesta y pueden depender de que el cliente aporte a tiempo contenidos, accesos y validaciones.</p>
<h2>5. Alcance y cambios</h2><p>El trabajo se limita a lo descrito en la propuesta. Los cambios de alcance se valoran y se acuerdan por escrito antes de ejecutarlos.</p>
<h2>6. Clientes consumidores</h2><p>Si el cliente es consumidor o usuario, se le facilitará la información precontractual que exige la normativa y se respetarán sus derechos irrenunciables. En los contratos celebrados a distancia puede existir un derecho de desistimiento de 14 días, con las excepciones y condiciones que establece la ley (por ejemplo, para servicios ya completamente ejecutados con su consentimiento previo y expreso o servicios personalizados). Cuando un encargo pueda empezar antes de que termine ese plazo, se pedirá una solicitud expresa por escrito y se informará de sus consecuencias. ${phx('[REVISIÓN JURÍDICA PENDIENTE DE ESTE APARTADO]')}</p>
<h2>7. Clientes profesionales y empresas</h2><p>Las condiciones se acordarán en la propuesta o en un contrato, con los pactos que procedan.</p>
<h2>8. Mantenimiento y servicios recurrentes</h2><p>El mantenimiento es opcional y se acuerda por separado, con su alcance, su precio y su forma de terminación. Actualmente ${phx('[CONFIRMAR SI SE OFRECEN SUSCRIPCIONES O SERVICIOS RECURRENTES]')}.</p>
<h2>9. Propiedad intelectual de los entregables</h2><p>Se rige por lo pactado en cada encargo; ver <a href="/propiedad-intelectual/">propiedad intelectual y licencias</a>.</p>`;

  P['propiedad-intelectual'] = `
<h2>1. Contenidos de esta web</h2><p>Los textos, el diseño y el código de este sitio, así como el nombre y el logotipo de Sintaxis Studio, pertenecen al titular o se usan con autorización. ${phx('[CONFIRMAR SI EXISTE REGISTRO DE MARCA; NO SE AFIRMA]')}</p>
<h2>2. Recursos de terceros</h2><p>Las tipografías Manrope, Inter y JetBrains Mono se distribuyen bajo la licencia SIL Open Font License 1.1 y se incluyen con su licencia en el sitio. Cualquier otro recurso de terceros deberá citarse con su licencia.</p>
<h2>3. Entregables de los proyectos</h2><p>Los derechos sobre diseños, código y otros entregables <strong>dependen de lo pactado en cada encargo</strong>. No se entiende que haya cesión automática de derechos de autor sin un acuerdo válido y por escrito. En general conviene distinguir entre:</p>
<ul><li><strong>Recursos propios del estudio</strong> (componentes, herramientas y plantillas reutilizables): pueden seguir siendo del estudio, con licencia de uso para el cliente según se acuerde.</li><li><strong>Licencias de terceros</strong> (bibliotecas de código abierto, fuentes, imágenes): se mantienen bajo sus propias licencias, que el cliente debe respetar.</li><li><strong>Entregables a medida</strong>: su titularidad o licencia, su alcance y sus límites se fijan en la propuesta o contrato.</li></ul>
<h2>4. Materiales del cliente</h2><p>El cliente garantiza que tiene derecho a usar y facilitar los contenidos que aporta (textos, imágenes, marcas, datos).</p>
<h2>5. Portfolio</h2><p>No se publican trabajos de clientes ni información confidencial sin su permiso expreso.</p>
<h2>6. Reclamaciones</h2><p>Si crees que algún contenido vulnera tus derechos, escribe a ${mail(c)} identificando el contenido y el motivo.</p>`;

  P.seguridad = `
<h2>1. Comunicar una vulnerabilidad</h2><p>Si crees haber encontrado un fallo de seguridad en esta web, puedes avisarnos escribiendo a ${mail(c)} con el asunto «Seguridad». Valoramos los avisos hechos de buena fe.</p>
<h2>2. Qué incluir</h2>${'<ul><li>Dirección donde has detectado el problema.</li><li>Descripción y pasos para reproducirlo.</li><li>Impacto que crees que puede tener.</li></ul>'}
<h2>3. Reglas de buena fe</h2><ul><li>No accedas, modifiques ni conserves datos que no sean tuyos.</li><li>No hagas pruebas de denegación de servicio, ingeniería social ni spam.</li><li>No publiques los detalles antes de que hayamos podido valorarlos.</li><li>Evita incluir datos personales de terceros en tu aviso.</li></ul>
<h2>4. Qué puedes esperar</h2><p>Somos un estudio pequeño: intentaremos acusar recibo y valorar el aviso, pero <strong>no garantizamos plazos de respuesta</strong> ni ofrecemos programa de recompensas. No emprenderemos acciones contra quien actúe de buena fe conforme a estas reglas, sin perjuicio de la ley aplicable.</p>
<h2>5. Archivo security.txt</h2><p>Cuando se configure el correo de contacto, el sitio publicará el archivo <code>/.well-known/security.txt</code> con estos datos.</p>`;

  return LEGAL.map(([s, t]) => ({
    path: `/${s}/`, title: t, body: wrap(t, P[s]),
    desc: { 'aviso-legal': 'Aviso legal de Sintaxis Studio con los datos del titular conforme a la LSSI-CE.', privacidad: 'Política de privacidad: qué datos trata Sintaxis Studio, para qué, con qué base y cómo ejercer tus derechos.', cookies: 'Política de cookies de Sintaxis Studio: tecnologías que usa la web y cuándo se pide consentimiento.', 'condiciones-de-uso': 'Condiciones de uso de la web de Sintaxis Studio.', 'condiciones-de-contratacion': 'Cómo funciona la solicitud de propuesta y la contratación de servicios con Sintaxis Studio.', 'propiedad-intelectual': 'Propiedad intelectual, licencias y entregables en los proyectos de Sintaxis Studio.', seguridad: 'Cómo comunicar una vulnerabilidad de seguridad a Sintaxis Studio.' }[s]
  }));
}
