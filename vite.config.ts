import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteThemePlugin, mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteThemePlugin({
      // Match the color to be modified
       colorVariables: [],
    })
  ]
})
