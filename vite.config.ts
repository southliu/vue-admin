import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    windiCSS(),
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
    port: 8080,
    open: true
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
    },
    // rollupOptions:{
    //   output:{
    //     manualChunks(id){ // 分包
    //       if(id.includes('node_modules')){
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // }
  }
})
