import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import '@/assets/css/scrollbar.less'
import '@/assets/css/iconfont.css'
import 'nprogress/nprogress.css'
import 'virtual:windi.css'
import 'ant-design-vue/dist/antd.min.css'

const app = createApp(App)
app
  .use(router)
  .use(createPinia())
app.mount('#app')
