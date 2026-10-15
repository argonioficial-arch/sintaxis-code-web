# Inventario de datos, tecnologías y servicios externos

## Servicios y scripts de terceros en la web
Ninguno. No hay analítica, publicidad, mapas, vídeos, chat, píxeles ni fuentes remotas. `check.mjs` verifica que no hay recursos externos ni almacenamiento en el navegador.

## Proveedores necesarios para operar (a elegir por el titular)
| Proveedor | Función | Datos que puede recibir | Cookies/almacenamiento | Consentimiento | Transferencia internacional | Revisar |
|---|---|---|---|---|---|---|
| [Alojamiento] (p. ej. Cloudflare Pages) | Servir la web y ejecutar la función del formulario | IP y datos técnicos de conexión; contenido del formulario al ejecutarse | Puede aplicar cookies técnicas propias: verificar | No para lo técnico | Depende del proveedor y la región | Contrato/DPA, ubicación, registros, cookies reales |
| [Correo transaccional] (código preparado para Resend) | Enviar al titular las solicitudes | Nombre, correo, tipo, descripción, presupuesto y plazo | Ninguna en la web | No | Depende del proveedor | Contrato/DPA, dominio verificado, retención de logs |
| KV de limitación (opcional) | Limitar envíos por IP | Hash SHA-256 truncado de la IP, 1 hora | Ninguna | No | Según alojamiento | Confirmar que basta para la finalidad |

No se debe declarar que existe contrato de encargado del tratamiento hasta que se formalice con cada proveedor.

## Datos personales recogidos
Formulario: nombre, correo, tipo de proyecto, descripción (obligatorios); presupuesto y plazo (opcionales); confirmación de lectura de la privacidad. Sin DNI, dirección ni teléfono.

## Dependencias de software
Ninguna en ejecución ni en compilación (solo Node.js). Tipografías Manrope, Inter y JetBrains Mono (SIL OFL 1.1) incluidas como archivos WOFF2 con su licencia. Para obtener los archivos se usaron los paquetes `@fontsource-variable/*` solo en la preparación; no forman parte del proyecto.
