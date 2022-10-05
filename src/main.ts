import { createApp } from 'vue'
import type { App } from 'vue'
import pinia from './stores'
import { router } from './router'
import { routerIntercept } from './router/intercept'
import Element from './App.vue'

// 样式
import 'virtual:uno.css'
import 'nprogress/nprogress.css'
import '@/assets/css/scrollbar.less'

// vxe-table
import { Column, Table, Grid } from 'vxe-table'
import 'vxe-table/es/style.min.css'
import './assets/css/vxeTable.less'

function useTable (app: App) {
  // 表格功能
  app
  // 可选组件
  .use(Column)
  // 安装表格
  .use(Table)
  .use(Grid)
}

const app = createApp(Element)
app
  .use(pinia)
  .use(router)
  .use(useTable)

router.isReady().then(() => {
  // 路由拦截处理
  routerIntercept(router)
  app.mount('#app')
})
