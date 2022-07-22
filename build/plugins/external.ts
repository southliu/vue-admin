import importToCDN from 'vite-plugin-cdn-import'

/**
 * CDN
 */
export function pluginExternal () {
  return importToCDN({
    modules: [
      {
        name: 'vue',
        var: 'Vue',
        path: 'https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.prod.js'
      },
      {
        name: 'vue-router',
        var: 'VueRouter',
        path: 'https://unpkg.com/vue-router@4.0.16/dist/vue-router.global.prod.js',
      },
      {
        name: 'vue-router',
        var: 'VueRouter',
        path: 'https://unpkg.com/vue-router@4.0.16/dist/vue-router.global.prod.js'
      },
      {
        name: 'vue-demi',
        var: 'VueDemi',
        path: 'https://cdn.bootcdn.net/ajax/libs/vue-demi/0.13.1/index.iife.js'
      },
      {
        name: 'pinia',
        var: 'Pinia',
        path: 'https://cdn.bootcdn.net/ajax/libs/pinia/2.0.14/pinia.iife.prod.min.js'
      },
      {
        name: 'crypto-js',
        var: 'CryptoJs',
        path: 'https://cdn.bootcdn.net/ajax/libs/crypto-js/4.1.1/crypto-js.min.js'
      }
    ]
  })
  
}
