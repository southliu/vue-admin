import { createApp } from 'vue'
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { routerIntercept } from './router/intercept'
import Element from './App.vue'

// 样式
import 'uno.css'
import 'nprogress/nprogress.css'
import '@/assets/css/scrollbar.less'

// iconify
import '@purge-icons/generated'

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
  .use(router)
  .use(useTable)
  .use(createPinia())

// 路由拦截处理
routerIntercept(router)

app.mount('#app')
