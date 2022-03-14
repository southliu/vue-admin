import { createApp } from 'vue'
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import Element from './App.vue'
import '@/assets/css/scrollbar.less'
import '@/assets/css/iconfont.css'
import 'nprogress/nprogress.css'
import 'virtual:windi.css'

// antv
import 'ant-design-vue/dist/antd.min.css'

// vxe-table
import { Header, Column, Table, Grid } from 'vxe-table'
import 'vxe-table/lib/style.min.css'

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
