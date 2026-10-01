import { app, BrowserWindow, shell } from 'electron'
import os from 'node:os'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

// Protocolos que se consideran seguros para abrir fuera de la app.
// Nada de `file:` ni `javascript:`: eso sería una fuga de contexto.
const PROTOCOLOS_PERMITIDOS = new Set(['https:', 'mailto:'])

let mainWindow

// Abre una URL externa en el navegador del sistema, solo si su protocolo
// está en la lista blanca.
function abrirEnNavegador (url) {
  try {
    const urlParseada = new URL(url)
    if (PROTOCOLOS_PERMITIDOS.has(urlParseada.protocol)) {
      shell.openExternal(urlParseada.href)
    }
  } catch {
    // URL no válida: se ignora deliberadamente
  }
}

// Indica si una URL apunta al contenido propio de la app (SPA).
// En desarrollo es el dev server; en producción, index.html vía file://.
function esContenidoDeLaApp (url) {
  if (process.env.DEV) {
    return typeof process.env.APP_URL === 'string' && url.startsWith(process.env.APP_URL)
  }
  return url.startsWith('file://')
}

async function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      // El renderer no necesita Node: la app solo usa APIs de navegador.
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      webviewTag: false,
      navigateOnDragDrop: false
    }
  })

  // Ventanas nuevas (window.open / target="_blank"): se deniegan siempre
  // y solo https/mailto se abren en el navegador del sistema.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    abrirEnNavegador(url)
    return { action: 'deny' }
  })

  // Toda navegación que no sea el contenido propio de la app se bloquea
  // (y si es http(s), además se abre fuera).
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!esContenidoDeLaApp(url)) {
      event.preventDefault()
      abrirEnNavegador(url)
    }
  })

  // No se permiten <webview> embebidos.
  mainWindow.webContents.on('will-attach-webview', event => {
    event.preventDefault()
  })

  if (process.env.DEV) {
    await mainWindow.loadURL(process.env.APP_URL)
  } else {
    await mainWindow.loadFile('index.html')
  }

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
