import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { handleEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = handleEnv(env)
  const { VITE_PROXY, VITE_SERVER_PORT } = viteEnv

  console.log('VITE_PROXY:', createProxy(VITE_PROXY))
  
  return {
    base: './',
    plugins: [
      vue(),
      windiCSS(),
      PurgeIcons({}),
      Unocss({
        presets: [
          presetUno(), 
          presetAttributify(), 
          presetIcons()
        ],
      }),
      AutoImport({
        resolvers: [
          AntDesignVueResolver()
        ]
      }),
      Components({
        resolvers: [
          AntDesignVueResolver()
        ]
      }),
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    define: {
      'process.env': {}
    },
    server: {
      port: VITE_SERVER_PORT,
      open: true,
      // 跨域处理
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      sourcemap: false,
      minify: false,
      brotliSize: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        },
      }
    }
  }
})
