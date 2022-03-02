import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss';
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    windiCSS(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    })
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
})
