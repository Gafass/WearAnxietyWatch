# Línea base DevSecOps, seguridad y privacidad

## Principios

- Privacidad y seguridad desde el diseño.
- Privilegio mínimo para identidades, permisos y automatizaciones.
- Dependencias reproducibles mediante lockfiles y revisiones automatizadas.
- Datos sintéticos en desarrollo, pruebas, documentación y soporte.
- Trazabilidad mediante Pull Requests, revisiones, CI y artefactos.
- Ningún resultado se presenta como diagnóstico médico.

## Controles automatizados

| Riesgo                       | Control                                                                     |
| ---------------------------- | --------------------------------------------------------------------------- |
| Cambio defectuoso            | Build, pruebas, lint y formato en `.github/workflows/ci.yml`                |
| Vulnerabilidad de código     | CodeQL para TypeScript/Java-Kotlin/Python                                   |
| Dependencia vulnerable nueva | Dependency Review en cada Pull Request                                      |
| Vulnerabilidades conocidas   | Auditoría npm con excepciones acotadas y `pip-audit` semanales y por cambio |
| Dependencias obsoletas       | Dependabot para npm, Gradle, pip y GitHub Actions                           |
| Acción de CI comprometida    | Acciones fijadas a SHA completo y permisos mínimos                          |
| Falta de inventario          | SBOM SPDX de npm como artefacto de Actions                                  |
| Cambio sin responsable       | `CODEOWNERS` y plantilla de Pull Request                                    |
| Divulgación insegura         | Reporte privado definido en `SECURITY.md`                                   |

## Datos sensibles

- Minimizar telemetría y conservar muestras crudas sólo el tiempo aprobado.
- Solicitar consentimiento explícito para datos fisiológicos y ubicación.
- No registrar contraseñas, tokens, coordenadas completas, muestras crudas ni identificadores personales.
- Cifrar datos sensibles en tránsito y en reposo cuando se implemente persistencia productiva.
- Separar los roles de paciente, cuidador y administrador.
- Tratar toda entrada de red, Data Layer y almacenamiento como no confiable.
- Aplicar idempotencia, correlación, retención y borrado desde la primera ruta vertical.

## Configuración recomendada en GitHub

1. Mantener Secret scanning y Push protection habilitados.
2. Habilitar Dependabot alerts y security updates.
3. Proteger `main`: Pull Request obligatorio, conversación resuelta, rama actualizada y checks de CI/Seguridad aprobados.
4. Bloquear force push y eliminación de `main`.
5. Establecer permisos predeterminados de Actions en sólo lectura.
6. Permitir únicamente acciones necesarias y exigir SHA completo.

## Revisión periódica

- Semanal: alertas de dependencias y resultados de CodeQL.
- Por Pull Request: permisos, flujo de datos, logs, amenazas y dependencias.
- Por versión: SBOM, matriz de riesgos, recuperación, retención y evidencia de pruebas.
- Ante incidente: contener, rotar secretos, preservar evidencia no sensible, corregir y documentar aprendizajes.

Las excepciones temporales se registran en `docs/security/RISK_ACCEPTANCE.md` y deben incluir responsable, alcance, mitigaciones y vencimiento. El vencimiento provoca un fallo automático para impedir excepciones permanentes.

Las credenciales locales viven en `.env`, excluido de Git. `.env.example` contiene únicamente valores de desarrollo no secretos.
