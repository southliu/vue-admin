import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export { router }