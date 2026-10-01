import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  // Leave these as they are and change in quasar.config.cjs instead!
  // quasar.config.cjs -> build -> vueRouterMode
  // quasar.config.cjs -> build -> vueRouterBase
  const history =
    process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: history(process.env.VUE_ROUTER_BASE)
  })

  return Router
}
