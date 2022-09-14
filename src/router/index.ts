import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import { menus } from '../menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: menus,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export { router }