# Contribuir a WearAnxietyWatch

## Flujo de trabajo

1. Crea una rama corta desde `main`.
2. Realiza cambios pequeños, revisables y acompañados de pruebas.
3. Actualiza lockfiles cuando cambien dependencias.
4. Abre un Pull Request usando la plantilla del repositorio.
5. Corrige los hallazgos de CI y seguridad antes de fusionar.

No hagas push directo a `main` cuando exista una regla de protección activa.

## Validación local

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run test
npm.cmd run lint
npm.cmd run format:check
npm.cmd run security:audit
.\gradlew.bat :apps:wear:testDebugUnitTest :apps:wear:lintDebug :apps:wear:assembleDebug
python -m pip install pip==26.1.2
python -m pytest services/ml
```

## Requisitos de seguridad y privacidad

- Nunca confirmes `.env`, llaves, keystores, AAR propietarios, tokens o credenciales.
- Usa exclusivamente datos sintéticos en pruebas y documentación.
- Aplica privilegio mínimo a permisos, tokens y GitHub Actions.
- Evita registrar telemetría cruda, ubicación precisa o identificadores personales.
- Valida entradas en los límites de red, Data Layer, almacenamiento y sensores.
- Documenta amenazas nuevas, mitigaciones y riesgos residuales.
- Reporta vulnerabilidades de forma privada según `SECURITY.md`.

## Dependencias

Justifica cada dependencia nueva, revisa mantenimiento/licencia, usa una versión compatible acotada y conserva su lockfile. Dependabot y la revisión de dependencias no sustituyen la revisión humana.
