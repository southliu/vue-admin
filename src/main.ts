import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import '@/assets/css/scrollbar.less'
import 'nprogress/nprogress.css'
import 'ant-design-vue/dist/antd.css'
import 'virtual:windi.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
