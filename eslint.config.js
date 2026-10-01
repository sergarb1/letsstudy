const js = require('@eslint/js')
const globals = require('globals')
const vue = require('eslint-plugin-vue')

module.exports = [
  {
    ignores: [
      'dist/**',
      '.quasar/**',
      'public/**',
      'node_modules/**',
      'ImagenesGooglePlay/**'
    ]
  },

  js.configs.recommended,

  // Código JavaScript (fuera de los .vue)
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none' }],
      'no-console': 'off'
    }
  },

  // Archivos CommonJS de configuración y utilidades de test
  {
    files: ['**/*.cjs', 'babel.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
    }
  },

  // Tests (mocha + require + import, ya que Babel los compila a CJS)
  {
    files: ['test/**/*.{js,cjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha
      }
    }
  },

  // Proceso principal de Electron (Node, sin DOM)
  {
    files: ['src-electron/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    }
  },

  // Reglas de Vue para .vue (solo corrección, sin imponer estilo de formato)
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // Los nombres de página (Resumen, Debug...) son de una sola palabra a propósito
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': ['warn', { args: 'none' }]
    }
  }
]
