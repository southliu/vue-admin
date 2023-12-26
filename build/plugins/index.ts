import type { Plugin } from 'vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import { timePlugin } from './time';
import { versionUpdatePlugin } from './version';
import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import PurgeIcons from 'vite-plugin-purge-icons';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import Pages from 'vite-plugin-pages';

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    PurgeIcons({}),
    Unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    }),
    vueJsx({}),
    // 压缩包
    viteCompression(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        AntDesignVueResolver()
      ]
    }),
    Pages({
      exclude: [
        '**/components/*.vue'
      ]
    }),
    // 包分析
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
    // 打包时间
    timePlugin(),
    // 版本控制
    versionUpdatePlugin()
  ];

  return vitePlugins;
}