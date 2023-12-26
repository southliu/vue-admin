import { defineConfig, loadEnv } from 'vite';
import { createProxy } from './build/vite/proxy';
import { handleEnv } from './build/utils/helper';
import { createVitePlugins } from './build/plugins';
import { buildOptions } from './build/vite/build';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = handleEnv(env);
  const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv;

  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': '/src',
        '#': '/types'
      }
    },
    server: {
      port: VITE_SERVER_PORT,
      open: true,
      // 跨域处理
      proxy: createProxy(VITE_PROXY)
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
    build: buildOptions()
  };
});
