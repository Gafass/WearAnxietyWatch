# Política de seguridad

## Versiones con soporte

La rama `main` y la versión `0.1.x` reciben correcciones de seguridad. Las ramas de trabajo y los artefactos de depuración no se consideran versiones soportadas.

## Reportar una vulnerabilidad

No publiques vulnerabilidades, credenciales ni datos fisiológicos en Issues, Discussions o Pull Requests.

Reporta el hallazgo de forma privada mediante **Security → Advisories → New draft security advisory** en este repositorio:

https://github.com/Gafass/WearAnxietyWatch/security/advisories/new

Incluye, cuando sea seguro hacerlo:

- componente y versión afectados;
- pasos mínimos de reproducción;
- impacto y condiciones necesarias para explotarlo;
- propuesta de mitigación;
- datos de contacto para coordinar la corrección.

No incluyas información médica, ubicación precisa, telemetría real, tokens o credenciales vigentes. Usa datos sintéticos y elimina metadatos personales de capturas y archivos.

## Objetivos de respuesta

- Acuse de recibo: hasta 3 días hábiles.
- Evaluación inicial y severidad: hasta 7 días hábiles.
- Actualizaciones: al menos cada 7 días mientras el caso siga abierto.
- Divulgación: coordinada después de publicar una corrección o mitigación.

Los tiempos pueden variar según la complejidad y el riesgo para usuarios.

## Alcance prioritario

Se consideran especialmente sensibles la autenticación, Data Layer, telemetría fisiológica, almacenamiento local, SOS, ubicación, permisos de Wear OS/Android y la cadena de suministro del build.
