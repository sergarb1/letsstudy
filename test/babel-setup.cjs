// Babel solo para los tests (Node): los ficheros de test mezclan require e import
require('@babel/register')({
  configFile: false,
  babelrc: false,
  extensions: ['.js'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }]
  ]
})
