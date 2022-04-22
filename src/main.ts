import { createApp } from 'vue'
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import Element from './App.vue'

// 样式
import 'uno.css'
import 'virtual:windi.css'
import 'nprogress/nprogress.css'
import '@/assets/css/scrollbar.less';

// iconify
import '@purge-icons/generated'

// vxe-table
import { Header, Column, Table, Grid } from 'vxe-table'
import './assets/css/vxeTable.less'

function useTable (app: App) {
  // 表格功能
  app.use(Header)
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
app.mount('#app')
