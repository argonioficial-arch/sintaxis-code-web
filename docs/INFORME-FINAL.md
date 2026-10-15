# Informe de revisión (estado real del proyecto)

No se afirma cumplimiento legal ni certificación alguna. Los resultados se refieren a las pruebas indicadas.

## Implementado y comprobado
- Generación de 18 páginas (inicio, servicios + 5 fichas, proyectos, sobre nosotros, contacto, 7 legales, 404), sitemap.xml, robots.txt, manifest y favicons. `node check.mjs`: enlaces internos, anclas, un H1 por página, títulos y descripciones únicos, imágenes con alt y dimensiones, sin estilos/scripts en línea (compatible con la CSP) y sin recursos externos.
- Navegador real (Chromium, escritorio claro 1280 px y móvil oscuro 390 px): sin desbordamiento horizontal en 11 rutas, sin peticiones a terceros, 0 cookies y 0 elementos en localStorage/sessionStorage tras navegar por varias páginas.
- Navegación por teclado: enlace «Saltar al contenido» como primer foco, orden lógico, foco visible; menú móvil con `aria-expanded` y cierre con Esc.
- Contraste medido en los pares de color usados: todos ≥ 6,4:1 (AA exige 4,5:1). El azul #76A9FF solo se usa como fondo de botón con texto grafito (7,9:1) o como texto sobre fondos oscuros (≥ 6,4:1); nunca como texto sobre claro.
- Formulario (cliente): validación con mensajes accesibles, enfoque en el primer error, casilla de privacidad sin premarcar y obligatoria, estados de carga, error y éxito. Sin backend muestra error, nunca un falso éxito.
- Función `/api/contact` probada con pruebas automáticas locales (proveedor y KV simulados): validación en servidor (422), honeypot, tiempo mínimo, tamaño máximo, tipo de contenido, comprobación de origen, límite por IP (hash), respuesta 503 si no está configurada y 502 si falla el proveedor, sin registrar datos personales.
- Privacidad: sin analítica, publicidad ni scripts o fuentes de terceros; tipografías autoalojadas con licencia OFL. Por eso no hay banner de cookies; la política de cookies lo explica.

## Implementado, pendiente de configuración
- Envío real de correo (variables de `.env.example`, proveedor, dominio verificado).
- Limitación de peticiones (KV `RATE_LIMIT` y regla del proveedor).
- Cabeceras de seguridad (`public/_headers`): se aplican en Cloudflare Pages/Netlify; no se han probado en un entorno desplegado. HTTPS y HSTS dependen del hosting.
- `security.txt`: se genera solo cuando se configura el correo.
- Dominio real en canonical, sitemap, robots y Open Graph.

## Pendiente de información del titular
Ver `docs/PENDIENTES.md`: titular y forma jurídica, NIF, domicilio, correo, proveedores, plazo de conservación, transferencias, régimen de facturación, modelo comercial y público destinatario.

## Pendiente de revisión jurídica
Los siete textos legales son borradores. Puntos a revisar con especial atención: base jurídica de las solicitudes, apartado de consumidores y desistimiento, y alcance de las obligaciones de la LSSI-CE según la forma jurídica.

## No implementado / límites
- No hay pruebas con lector de pantalla ni auditoría WCAG completa; se ha diseñado hacia el nivel AA sin afirmar conformidad.
- No hay casos reales ni capturas: los proyectos son demostraciones conceptuales identificadas como tales.
- No hay tienda ni pagos (por diseño). No hay tema claro/oscuro manual: se sigue la preferencia del sistema y no se guarda ninguna elección.
- No se ha probado en Safari ni Firefox, ni en dispositivos físicos.
- Rendimiento no medido con Lighthouse; el sitio es estático, sin dependencias y con fuentes locales.
