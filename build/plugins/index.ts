import type { Plugin } from 'vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { configStyleImportPlugin } from './styleImport'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: (Plugin | Plugin[])[] = [
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
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    // 压缩包
    viteCompression(),
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
    // 包分析
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
    // css按需加载
    configStyleImportPlugin()
  ]

  return vitePlugins
}