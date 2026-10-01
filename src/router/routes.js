
const children = [
  { path: '', component: () => import('pages/Resumen.vue') },
  // Modificado para que router conozca que componentes cargar en la pagina
  // segun la ruta que se le proporcione
  { path: 'Cronometro', component: () => import('pages/Cronometro.vue') },
  { path: 'AcercaDe', component: () => import('pages/AcercaDe.vue') },
  { path: 'Resumen', component: () => import('pages/Resumen.vue') },
  { path: 'PlanEstudio', component: () => import('pages/PlanEstudio.vue') },
  { path: 'ConfigurarPomodoro', component: () => import('pages/PaginaConfigurarPomodoro.vue') },
  { path: 'Historico', component: () => import('pages/Historico.vue') },
  { path: 'ImportarExportar', component: () => import('pages/ImportarExportar.vue') }
]

// La pagina de Debug solo se registra en builds de desarrollo:
// en produccion no debe existir una ruta que permita volcar o
// sobreescribir los datos de localStorage.
if (process.env.DEBUGGING) {
  children.push({ path: 'Debug', component: () => import('pages/Debug.vue') })
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
