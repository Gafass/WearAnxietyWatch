# Registro de riesgos aceptados

## RISK-2026-001 · `image-size` transitivo de Metro

- **Estado:** abierto, aceptación temporal.
- **Responsable:** `@Gafass`.
- **Identificadores:** `GHSA-w3rx-r6r6-pgpr` y `GHSA-5p2g-fcmc-qvqq`.
- **Severidad publicada:** alta.
- **Vencimiento:** 2026-09-30.
- **Dependencia:** `image-size@1.2.1`, transitiva de Metro/React Native.

### Motivo

Al 9 de agosto de 2026, ambos avisos indican que todas las versiones publicadas hasta `2.0.2` están afectadas y que no existe una versión corregida. La corrección automática propuesta por npm degrada React Native de `0.84.x` a `0.72.x`, lo que es disruptivo y no elimina el riesgo mediante una actualización compatible.

### Exposición

Metro utiliza la dependencia durante el proceso de desarrollo/build. AnxietyWatch no ofrece una API que procese imágenes no confiables con `image-size`; los recursos del bundle provienen del repositorio y pasan por revisión. La consecuencia publicada es indisponibilidad por bucle infinito, no lectura o modificación de datos.

### Mitigaciones

- No procesar imágenes aportadas por usuarios en el pipeline móvil.
- Revisar todos los recursos binarios agregados al repositorio.
- Mantener límites de tiempo en CI para contener builds bloqueados.
- Bloquear automáticamente cualquier aviso alto o crítico distinto de estos dos.
- Revisar semanalmente Dependabot y el registro de npm.

### Cierre

Actualizar Metro/React Native o aplicar una versión corregida de `image-size` tan pronto exista una ruta compatible. El control `scripts/security/npm-audit.mjs` falla automáticamente después del vencimiento o si aparece un identificador no autorizado.
