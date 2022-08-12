import importToCDN from 'vite-plugin-cdn-import'

/**
 * CDN
 */
export function pluginExternal () {
  return importToCDN({
    modules: [
      {
        name: 'crypto-js',
        var: 'CryptoJs',
        path: 'https://cdn.bootcdn.net/ajax/libs/crypto-js/4.1.1/crypto-js.min.js'
      }
    ]
  })
  
}
