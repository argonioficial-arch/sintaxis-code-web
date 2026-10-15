# Sintaxis Studio — web corporativa

Sitio estático multipágina (HTML semántico, CSS moderno, JavaScript mínimo) generado con un script de Node **sin dependencias**. Incluye 18 páginas, textos legales en borrador, formulario con función serverless y tipografías autoalojadas.

## Requisitos
Node.js 18 o superior. No hay `npm install`: no hay dependencias.

## Uso
```bash
node build.mjs     # genera dist/
node check.mjs     # comprueba enlaces, anclas, H1, títulos, CSP y almacenamiento
node serve.mjs     # sirve dist/ en http://localhost:8080  (o: npm start)
```
En local el formulario mostrará un error al enviar: el backend (`functions/api/contact.js`) solo existe en Cloudflare Pages una vez configurado. Es lo esperado.

## Estructura
```
src/site.config.json   Nombre, URL, correo y marcadores legales (EDITAR AQUÍ)
src/layout.mjs         Cabecera, pie, metadatos SEO / Open Graph
src/pages.mjs          Inicio, servicios, proyectos, sobre nosotros, contacto
src/legal.mjs          Aviso legal, privacidad, cookies, condiciones, PI, seguridad
public/                Se copia tal cual a dist/ (CSS, JS, fuentes, logos, _headers)
functions/api/contact.js  Backend del formulario (Cloudflare Pages Functions)
build.mjs · check.mjs · serve.mjs
docs/                  Pendientes, inventario de tecnologías e informe de revisión
dist/                  Resultado ya generado (con los marcadores sin completar)
```

## Antes de publicar (resumen; detalle en docs/PENDIENTES.md)
1. Edita `src/site.config.json`: `url` (dominio real), `email` y todos los datos de `legal`. Ejecuta `node build.mjs`: el aviso final indica cuántos marcadores amarillos quedan. **No publiques mientras queden.**
2. Haz revisar los textos legales (son un borrador).
3. Configura el formulario (abajo) o, si no lo vas a usar, sustituye el formulario por un enlace `mailto:`.
4. Despliega `dist/` con HTTPS y comprueba las cabeceras.

## Despliegue en Cloudflare Pages (recomendado: incluye funciones y cabeceras)
1. Sube este proyecto a un repositorio (Git) y créalo como proyecto en Cloudflare Pages.
2. Build command: `node build.mjs` · Output directory: `dist` · Variable `NODE_VERSION=20`.
3. La carpeta `functions/` se despliega sola y crea `POST /api/contact`.
4. `public/_headers` aplica la CSP y demás cabeceras de seguridad (Cloudflare Pages y Netlify las leen; en otro hosting hay que replicarlas).

## Conectar el formulario y el correo
1. Crea una cuenta en un proveedor de correo transaccional. El código usa la API de Resend (puedes cambiar `fetch` por otro proveedor); verifica tu dominio de envío.
2. En Cloudflare Pages > Settings > Variables: `SITE_ORIGIN`, `RESEND_API_KEY` (como *Secret*), `CONTACT_TO`, `CONTACT_FROM` (ver `.env.example`).
3. Opcional pero recomendado: crea un espacio KV y enlázalo con el nombre `RATE_LIMIT` (limita a 5 envíos por hora e IP, guardando solo un hash).
4. Añade en Cloudflare una regla de limitación de peticiones sobre `/api/contact`.
5. Prueba un envío real y comprueba que llega, y que sin variables el formulario muestra el error y no un falso éxito.
6. Actualiza `docs`/privacidad con el proveedor real y su contrato de encargado del tratamiento.

## Dominio y HTTPS
Añade el dominio en Cloudflare Pages (o tu hosting), apunta el DNS como indique el panel y activa HTTPS y la redirección de HTTP a HTTPS. Activa HSTS desde el panel del proveedor cuando todo funcione.

## Qué funciona realmente y qué necesita configuración
Ver `docs/INFORME-FINAL.md`.
