import type { Plugin } from 'vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { configVisualizerConfig } from './visualizer'
import { configStyleImportPlugin } from './styleImport'
import { createI18n } from './i18n'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    windiCSS(),
    createI18n(),
    PurgeIcons({}),
    Unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
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
  ]
  
  vitePlugins.push(configVisualizerConfig)

  // css按需加载
  vitePlugins.push(configStyleImportPlugin())

  return vitePlugins
}