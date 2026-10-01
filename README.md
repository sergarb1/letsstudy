# Let's Study
Aplicación para facilitar el estudio. En este repositorio tenemos el código del proyecto.

Aplicación **Quasar 2 (Vue 3)** publicada como web (GitHub Pages) y como aplicación de escritorio (Electron), sin backend: los datos se guardan en el `localStorage` del navegador.

# Descargas y enlaces
- Google Play: https://play.google.com/store/apps/details?id=org.ceedcv.letsstudy
- Acceso web: https://aprendeaprogramar.org/letsstudy
- Descarga versión Web, Móvil y Escritorio: https://github.com/sergarb1/letsstudy-downloads

# Requisitos
- Node.js >= 20 y npm >= 9
- Git

# Desarrollo
```bash
npm ci          # instala dependencias (equivalente a npm install)
npm run dev     # servidor de desarrollo con hot-reload (http://localhost:8080)
```

# Scripts disponibles
| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (SPA) |
| `npm run build` | Build de producción en `dist/spa` (GitHub Pages) |
| `npm run build:electron` | Empaqueta la app de escritorio en `dist/electron` |
| `npm run lint` | ESLint (flat config) sobre todo el código |
| `npm test` | Tests con Mocha |
| `npm run audit` | Auditoría de dependencias (nivel alto o crítico) |

# Estructura del proyecto
```
index.html            Plantilla HTML (incluye la Content Security Policy de producción)
quasar.config.cjs     Configuración de Quasar (webpack, Electron, plugins...)
public/statics        Ficheros estáticos copiados tal cual (favicon...)
src/
  pages/              Vistas (Resumen, Cronómetro, Histórico...)
  layouts/            Estructura común con cabecera y menú
  router/             Rutas de vue-router (la ruta Debug solo existe en desarrollo)
  clases/             Modelo de datos (Usuario, SesionEstudio, PlanEstudio...)
  componentes/        Componentes reutilizables
  css/                Estilos globales (Sass)
src-electron/
  electron-main.js    Proceso principal de Electron endurecido
test/                 Tests (Mocha + Babel)
.github/workflows/    Integración continua
```

# Calidad y mantenimiento
- **CI** (`.github/workflows/ci.yml`): en cada push/PR se ejecutan lint, tests, build web, auditoría de seguridad y build de Electron.
- **Dependabot** (`.github/dependabot.yml`): actualiza dependencias y actions cada semana.
- **ESLint** con `eslint.config.js` (flat config, sin Prettier para no imponer formato).
- `npm run audit` vigilia vulnerabilidades en dependencias.

# Seguridad
- CSP (Content Security Policy) inyectada solo en el build de producción: sin `unsafe-eval`, sin `data:` en scripts, sin externos.
- Electron corre con `contextIsolation`, `sandbox` y sin `nodeIntegration`; las URLs externas solo se abren en el navegador si son `https:` o `mailto:`.
- El estado se guarda con `try/catch`: si el `localStorage` está corrupto, los datos se respaldan en `usuarioLocal__respaldo` y la app arranca de cero en lugar de romperse.
- La importación de JSON valida el formato antes de sobreescribir nada.
- La página de Debug solo existe en builds de desarrollo.

# Autores originales de la aplicación (Orden alfabético)
- Carlos Aparicio
- Vicente Bataller García
- Ximo Catalá
- Cristina Chiarri Toumit
- Alejandro Cortell Marín
- Eva Díaz
- Sergi García
- Loli González Campos
- César Meliá Herráiz
- Lionel Tarazón Alcocer
