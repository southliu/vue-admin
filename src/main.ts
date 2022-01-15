import { createApp } from 'vue'
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import App from './App.vue'

const i18n = createI18n({
  // something vue-i18n options here ...
})

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(createPinia())

app.mount('#app')

// export const createApp = ViteSSG(
//   // the root component
//   App,
//   // vue-router options
//   { routes },
//   // function to have custom setups
//   ({ app, router, routes, isClient, initialState }) => {
//     app.use(i18n)
//     app.use(createPinia())

//     app.mount('#app')
//   }
// )
