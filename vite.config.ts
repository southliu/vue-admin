import { defineConfig, loadEnv } from 'vite'
import { handleEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = handleEnv(env)
  const { VITE_SERVER_PORT } = viteEnv

  return {
    base: '/',
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types'
      }
    },
    define: {
      'process.env': {}
    },
    server: {
      port: VITE_SERVER_PORT,
      open: true,
      // 跨域处理
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    test: {
      environment: 'jsdom',
      setupFiles: './tests/index.ts'
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        },
      },
    },
    build: {
      sourcemap: false,
      minify: false,
      brotliSize: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // if (id.includes('node_modules')) {
            //   return id.toString().split('node_modules/')[1].split('/')[0].toString()
            // }
          }
        }
      },
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
