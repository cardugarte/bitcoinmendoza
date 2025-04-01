# Guía de Contribución

## Convenciones de Commits

Utilizamos Conventional Commits para estandarizar nuestros mensajes de commit. Cada mensaje de commit debe tener esta estructura:

```bash
git commit -m "feat: implementar formulario de creación de badges"
git commit -m "fix: corregir renderizado del código QR"
git commit -m "docs: actualizar README con documentación de API"
```

### Tipos de Commits

- `feat`: Nueva característica (incrementa versión MINOR)
- `fix`: Corrección de errores (incrementa versión PATCH)
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, puntos y coma, etc)
- `refactor`: Refactorización del código
- `perf`: Mejoras de rendimiento
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
git commit -m "feat: implementar formulario de creación de badges"
git commit -m "fix: corregir renderizado del código QR"
git commit -m "docs: actualizar README con documentación de API"
```

## Control de Versiones

Seguimos Semantic Versioning (SemVer) para el versionado:

`MAJOR.MINOR.PATCH` (ejemplo: 1.2.3)

- `MAJOR`: cambios incompatibles con versiones anteriores
- `MINOR`: nuevas características compatibles
- `PATCH`: correcciones de errores compatibles

### Incremento Automático de Versiones

Los tipos de commits afectan automáticamente la versión:
- `feat:` → incrementa MINOR (1.2.0 → 1.3.0)
- `fix:` → incrementa PATCH (1.2.0 → 1.2.1)
- `feat!:` o `BREAKING CHANGE:` → incrementa MAJOR (1.2.0 → 2.0.0)

### Generar Nueva Versión

Para crear una nueva versión:

```bash
pnpm run release
```

Esto:
1. Analiza los commits desde la última versión
2. Incrementa el número de versión según corresponda
3. Actualiza el CHANGELOG.md
4. Crea un tag de git con la nueva versión

## Flujo de Trabajo Recomendado

1. Crear una rama para tu característica/fix:
```bash
git checkout -b feature/nombre-caracteristica
```

2. Realizar cambios y commits siguiendo las convenciones

3. Actualizar rama con main/master:
```bash
git checkout main
git pull
git checkout feature/nombre-caracteristica
git rebase main
```

4. Crear Pull Request

5. Después de la aprobación y merge, considerar si es necesario una nueva versión