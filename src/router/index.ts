import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import { menus } from '../menus'

const router = createRouter({
  history: createWebHistory(),
  routes: menus,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export { router }