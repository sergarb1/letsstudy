/*
 * Configuración de la app Quasar (@quasar/app-webpack v4).
 *
 * El CLI v4 interpreta `quasar.config.js` como ESM, así que este fichero
 * se mantiene en CommonJS con la extensión `.cjs`.
 * https://quasar.dev/quasar-cli-webpack/the-quasar-config-file
 */

module.exports = function (/* ctx */) {
  return {
    // https://quasar.dev/quasar-cli-webpack/boot-files
    boot: [],

    // https://quasar.dev/quasar-cli-webpack/quasar-config-js#css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli-webpack/quasar-config-js
    build: {
      vueRouterMode: 'hash' // available values: 'hash', 'history'
    },

    // https://quasar.dev/quasar-cli-webpack/dev-server
    devServer: {
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli-webpack/quasar-config-js#framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-US', // Quasar language pack

      // 'auto': auto-import de componentes y directivas necesarios
      all: 'auto',

      components: [],
      directives: [],

      // Quasar plugins
      plugins: ['Notify', 'Dialog', 'Loading']
    },

    animations: [],

    // https://quasar.dev/quasar-cli-webpack/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli-webpack/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Lets Study',
        short_name: 'Lets Study',
        description: 'Aplicación para mejorar el ritmo de estudio',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli-webpack/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli-webpack/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      // La app no necesita Node en el proceso de renderizado ni un preload:
      // el endurecimiento se hace en src-electron/electron-main.js
      preloadScripts: [],

      packager: {
        // https://github.com/electron/electron-packager/blob/master/docs/api.md#options
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'letsstudy'
      }
    }
  }
}
