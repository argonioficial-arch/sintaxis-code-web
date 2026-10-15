# Pendientes antes de publicar

## Información del titular (marcadores amarillos en la web; se editan en src/site.config.json)
- [ ] Nombre o denominación legal y forma jurídica (persona física/autónomo, sociedad, proyecto en fase inicial).
- [ ] NIF/CIF y datos registrales, solo si proceden.
- [ ] Domicilio o datos de contacto exigibles y correo público.
- [ ] Dominio definitivo (`url`).
- [ ] Proveedor de alojamiento y de correo; confirmar contratos de encargado del tratamiento.
- [ ] Plazo de conservación de las solicitudes recibidas.
- [ ] Transferencias internacionales según los proveedores elegidos.
- [ ] Régimen fiscal y datos de facturación (condiciones de contratación).
- [ ] Si habrá pagos directos, suscripciones o servicios recurrentes (hoy la web solo recoge solicitudes).
- [ ] Si habrá clientes particulares, empresas o ambos (afecta a las condiciones para consumidores).
- [ ] Confirmar que la web no se dirige a menores.
- [ ] Si existe registro de la marca «Sintaxis Studio» (no se afirma).

## Si el titular es menor de edad
Revisar con sus representantes legales y, si es necesario, con un profesional: capacidad para contratar, cobrar, asumir obligaciones fiscales y formalizar acuerdos en España. Publicar la web no autoriza por sí mismo a desarrollar una actividad económica.

## Revisión jurídica
- [ ] Todos los textos de /aviso-legal, /privacidad, /cookies, /condiciones-de-uso, /condiciones-de-contratacion y /propiedad-intelectual.
- [ ] Base jurídica de las solicitudes de propuesta (se indica art. 6.1.b RGPD, a confirmar).
- [ ] Apartado de desistimiento y consumidores.

## Comprobaciones técnicas previas a la publicación
- [ ] `node build.mjs` sin avisos y `node check.mjs` en verde.
- [ ] Formulario: envío real de prueba, y comprobar que con la configuración incompleta no muestra éxito.
- [ ] Revisar en el dominio real, en DevTools, que no hay cookies ni peticiones externas (si las hay, actualizar /cookies).
- [ ] Cabeceras HTTP (CSP, nosniff, etc.) activas en producción; HTTPS y HSTS.
- [ ] Sitemap y robots con el dominio real; enviar a Search Console si se desea.
- [ ] Pruebas con lector de pantalla y navegación por teclado en el entorno final.
- [ ] Sustituir las demostraciones por casos reales solo con permiso del cliente.
