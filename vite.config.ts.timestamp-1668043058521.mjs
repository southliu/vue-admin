// vite.config.ts
import { defineConfig, loadEnv } from "vite";

// build/utils.ts
function handleEnv(envConfigs) {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs;
  const proxy = VITE_PROXY ? JSON.parse(VITE_PROXY.replace(/'/g, '"')) : [];
  const res = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: proxy
  };
  return res;
}

// build/vite/proxy.ts
function createProxy(list = []) {
  const res = {};
  for (const [prefix, target] of list) {
    res[`^${prefix}`] = {
      target,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), "")
    };
  }
  return res;
}

// build/plugins/index.ts
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { presetUno, presetAttributify, presetIcons } from "unocss";

// build/plugins/styleImport.ts
import { createStyleImportPlugin } from "vite-plugin-style-import";
function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    libs: [
      {
        libraryName: "ant-design-vue",
        esModule: true,
        resolveStyle: (name) => {
          const ignoreList = [
            "anchor-link",
            "sub-menu",
            "menu-item",
            "menu-divider",
            "menu-item-group",
            "breadcrumb-item",
            "breadcrumb-separator",
            "form-item",
            "step",
            "select-option",
            "select-opt-group",
            "card-grid",
            "card-meta",
            "collapse-panel",
            "descriptions-item",
            "list-item",
            "list-item-meta",
            "table-column",
            "table-column-group",
            "tab-pane",
            "tab-content",
            "timeline-item",
            "tree-node",
            "skeleton-input",
            "skeleton-avatar",
            "skeleton-title",
            "skeleton-paragraph",
            "skeleton-image",
            "skeleton-button"
          ];
          const replaceList = {
            "typography-text": "typography",
            "typography-title": "typography",
            "typography-paragraph": "typography",
            "typography-link": "typography",
            "dropdown-button": "dropdown",
            "input-password": "input",
            "input-search": "input",
            "input-group": "input",
            "radio-group": "radio",
            "checkbox-group": "checkbox",
            "layout-sider": "layout",
            "layout-content": "layout",
            "layout-footer": "layout",
            "layout-header": "layout",
            "month-picker": "date-picker"
          };
          return ignoreList.includes(name) ? "" : Object.prototype.hasOwnProperty.call(replaceList, name) ? `ant-design-vue/es/${replaceList[name]}/style/index` : `ant-design-vue/es/${name}/style/index`;
        }
      }
    ]
  });
  return styleImportPlugin;
}

// build/plugins/pages.ts
import Pages from "vite-plugin-pages";
function configPageImportPlugin() {
  return [
    Pages({
      resolver: "vue",
      importMode: "async",
      exclude: [
        "**/components/**/*",
        "**/utils/**/*",
        "**/lib/**/*",
        "**/hooks/**/*",
        "**/model.ts",
        "**/tests/**/*",
        "**/__test__/**/*"
      ]
    })
  ];
}

// build/plugins/index.ts
import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import PurgeIcons from "vite-plugin-purge-icons";
import Components from "unplugin-vue-components/vite";
import Unocss from "unocss/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteCompression from "vite-plugin-compression";
function createVitePlugins() {
  const vitePlugins = [
    vue(),
    PurgeIcons({}),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    }),
    vueJsx({}),
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
    visualizer({
      gzipSize: true,
      brotliSize: true
    }),
    configStyleImportPlugin(),
    configPageImportPlugin()
  ];
  return vitePlugins;
}

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = handleEnv(env);
  const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv;
  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        "@": "/src",
        "#": "/types"
      }
    },
    define: {
      "process.env": {}
    },
    server: {
      port: VITE_SERVER_PORT,
      open: true,
      proxy: createProxy(VITE_PROXY)
    },
    test: {
      environment: "jsdom",
      setupFiles: "./tests/index.ts"
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    build: {
      sourcemap: false,
      minify: false,
      brotliSize: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
          }
        }
      },
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wcm94eS50cyIsICJidWlsZC9wbHVnaW5zL2luZGV4LnRzIiwgImJ1aWxkL3BsdWdpbnMvc3R5bGVJbXBvcnQudHMiLCAiYnVpbGQvcGx1Z2lucy9wYWdlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS92dWUtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBoYW5kbGVFbnYgfSBmcm9tICcuL2J1aWxkL3V0aWxzJ1xyXG5pbXBvcnQgeyBjcmVhdGVQcm94eSB9IGZyb20gJy4vYnVpbGQvdml0ZS9wcm94eSdcclxuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tICcuL2J1aWxkL3BsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKClcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpXHJcbiAgY29uc3Qgdml0ZUVudiA9IGhhbmRsZUVudihlbnYpXHJcbiAgY29uc3QgeyBWSVRFX1NFUlZFUl9QT1JULCBWSVRFX1BST1hZIH0gPSB2aXRlRW52XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucygpLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogJy9zcmMnLFxyXG4gICAgICAgICcjJzogJy90eXBlcydcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAncHJvY2Vzcy5lbnYnOiB7fVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiBWSVRFX1NFUlZFUl9QT1JULFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICAvLyBcdThERThcdTU3REZcdTU5MDRcdTc0MDZcclxuICAgICAgcHJveHk6IGNyZWF0ZVByb3h5KFZJVEVfUFJPWFkpXHJcbiAgICB9LFxyXG4gICAgdGVzdDoge1xyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgc2V0dXBGaWxlczogJy4vdGVzdHMvaW5kZXgudHMnXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgICAgbWluaWZ5OiBmYWxzZSxcclxuICAgICAgYnJvdGxpU2l6ZTogZmFsc2UsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIG1hbnVhbENodW5rcyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgLy8gICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAgIGtlZXBfaW5maW5pdHk6IHRydWUsXHJcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXHJcbiAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxcdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvdnVlLWFkbWluL2J1aWxkL3V0aWxzLnRzXCI7dHlwZSBJRW52Q29uZmlncyA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cclxuXHJcbi8vIGVudlx1NjU3MFx1NjM2RVxyXG5pbnRlcmZhY2UgSVZpdGVFbnYge1xyXG4gIFZJVEVfU0VSVkVSX1BPUlQ6IG51bWJlcjtcclxuICBWSVRFX1BST1hZOiBbc3RyaW5nLCBzdHJpbmddW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTU5MDRcdTc0MDZcdThGNkNcdTUzMTZlbnZcclxuICogQHBhcmFtIGVudkNvbmZpZ3MgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRW52KGVudkNvbmZpZ3M6IElFbnZDb25maWdzKTogSVZpdGVFbnYge1xyXG4gIGNvbnN0IHtcclxuICAgIFZJVEVfU0VSVkVSX1BPUlQsXHJcbiAgICBWSVRFX1BST1hZXHJcbiAgfSA9IGVudkNvbmZpZ3NcclxuXHJcbiAgY29uc3QgcHJveHk6IFtzdHJpbmcsIHN0cmluZ11bXSA9IFZJVEVfUFJPWFkgPyBKU09OLnBhcnNlKFZJVEVfUFJPWFkucmVwbGFjZSgvJy9nLCAnXCInKSkgOiBbXVxyXG5cclxuICBjb25zdCByZXM6IElWaXRlRW52ID0ge1xyXG4gICAgVklURV9TRVJWRVJfUE9SVDogTnVtYmVyKFZJVEVfU0VSVkVSX1BPUlQpIHx8IDgwODAsXHJcbiAgICBWSVRFX1BST1hZOiBwcm94eVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc1xyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3Z1ZS1hZG1pbi9idWlsZC92aXRlL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tIFwidml0ZVwiXHJcblxyXG50eXBlIFByb3h5TGlzdCA9IFtzdHJpbmcsIHN0cmluZ11bXVxyXG5cclxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+XHJcblxyXG4vKipcclxuICogXHU1MjFCXHU1RUZBXHU4REU4XHU1N0RGXHJcbiAqIEBwYXJhbSBsaXN0IC0gXHU0RThDXHU3RUY0XHU2NTcwXHU3RUM0XHU1M0MyXHU2NTcwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcclxuICBjb25zdCByZXM6IFByb3h5VGFyZ2V0TGlzdCA9IHt9XHJcbiAgXHJcbiAgZm9yIChjb25zdCBbcHJlZml4LCB0YXJnZXRdIG9mIGxpc3QpIHtcclxuICAgIHJlc1tgXiR7cHJlZml4fWBdID0ge1xyXG4gICAgICB0YXJnZXQsXHJcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgLy8gd3M6IHRydWUsXHJcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc1xyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3Z1ZS1hZG1pbi9idWlsZC9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRBdHRyaWJ1dGlmeSwgcHJlc2V0SWNvbnMgfSBmcm9tICd1bm9jc3MnXHJcbmltcG9ydCB7IGNvbmZpZ1N0eWxlSW1wb3J0UGx1Z2luIH0gZnJvbSAnLi9zdHlsZUltcG9ydCdcclxuaW1wb3J0IHsgY29uZmlnUGFnZUltcG9ydFBsdWdpbiB9IGZyb20gJy4vcGFnZXMnXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgUHVyZ2VJY29ucyBmcm9tICd2aXRlLXBsdWdpbi1wdXJnZS1pY29ucydcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKCkge1xyXG4gIC8vIFx1NjNEMlx1NEVGNlx1NTNDMlx1NjU3MFxyXG4gIGNvbnN0IHZpdGVQbHVnaW5zOiAoUGx1Z2luIHwgUGx1Z2luW10pW10gPSBbXHJcbiAgICB2dWUoKSxcclxuICAgIFB1cmdlSWNvbnMoe30pLFxyXG4gICAgVW5vY3NzKHtcclxuICAgICAgcHJlc2V0czogW1xyXG4gICAgICAgIHByZXNldFVubygpLCBcclxuICAgICAgICBwcmVzZXRBdHRyaWJ1dGlmeSgpLCBcclxuICAgICAgICBwcmVzZXRJY29ucygpXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICAgIHZ1ZUpzeCh7fSksXHJcbiAgICAvLyBcdTUzOEJcdTdGMjlcdTUzMDVcclxuICAgIHZpdGVDb21wcmVzc2lvbigpLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKClcclxuICAgICAgXVxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgQW50RGVzaWduVnVlUmVzb2x2ZXIoKVxyXG4gICAgICBdXHJcbiAgICB9KSxcclxuICAgIC8vIFx1NTMwNVx1NTIwNlx1Njc5MFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxyXG4gICAgICBicm90bGlTaXplOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICAvLyBjc3NcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcclxuICAgIGNvbmZpZ1N0eWxlSW1wb3J0UGx1Z2luKCksXHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcclxuICAgIGNvbmZpZ1BhZ2VJbXBvcnRQbHVnaW4oKVxyXG4gIF1cclxuXHJcbiAgcmV0dXJuIHZpdGVQbHVnaW5zXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcc3R5bGVJbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvdnVlLWFkbWluL2J1aWxkL3BsdWdpbnMvc3R5bGVJbXBvcnQudHNcIjsvKipcclxuICogQGRlc2NyaXB0aW9uIFx1NjgzN1x1NUYwRlx1NjMwOVx1OTcwMFx1NTJBMFx1OEY3RFxyXG4gKi9cclxuaW1wb3J0IHsgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnU3R5bGVJbXBvcnRQbHVnaW4oKSB7XHJcbiAgY29uc3Qgc3R5bGVJbXBvcnRQbHVnaW4gPSBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XHJcbiAgICBsaWJzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBsaWJyYXJ5TmFtZTogJ2FudC1kZXNpZ24tdnVlJyxcclxuICAgICAgICBlc01vZHVsZTogdHJ1ZSxcclxuICAgICAgICByZXNvbHZlU3R5bGU6IChuYW1lKSA9PiB7XHJcbiAgICAgICAgICAvLyBcdThGRDlcdTkxQ0NcdTY2MkZcdTY1RTBcdTk3MDBcdTk4OURcdTU5MTZcdTVGMTVcdTUxNjVcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjZcdTc2ODRcdTIwMUNcdTVCNTBcdTdFQzRcdTRFRjZcdTIwMURcdTUyMTdcdTg4NjhcclxuICAgICAgICAgIGNvbnN0IGlnbm9yZUxpc3QgPSBbXHJcbiAgICAgICAgICAgICdhbmNob3ItbGluaycsXHJcbiAgICAgICAgICAgICdzdWItbWVudScsXHJcbiAgICAgICAgICAgICdtZW51LWl0ZW0nLFxyXG4gICAgICAgICAgICAnbWVudS1kaXZpZGVyJyxcclxuICAgICAgICAgICAgJ21lbnUtaXRlbS1ncm91cCcsXHJcbiAgICAgICAgICAgICdicmVhZGNydW1iLWl0ZW0nLFxyXG4gICAgICAgICAgICAnYnJlYWRjcnVtYi1zZXBhcmF0b3InLFxyXG4gICAgICAgICAgICAnZm9ybS1pdGVtJyxcclxuICAgICAgICAgICAgJ3N0ZXAnLFxyXG4gICAgICAgICAgICAnc2VsZWN0LW9wdGlvbicsXHJcbiAgICAgICAgICAgICdzZWxlY3Qtb3B0LWdyb3VwJyxcclxuICAgICAgICAgICAgJ2NhcmQtZ3JpZCcsXHJcbiAgICAgICAgICAgICdjYXJkLW1ldGEnLFxyXG4gICAgICAgICAgICAnY29sbGFwc2UtcGFuZWwnLFxyXG4gICAgICAgICAgICAnZGVzY3JpcHRpb25zLWl0ZW0nLFxyXG4gICAgICAgICAgICAnbGlzdC1pdGVtJyxcclxuICAgICAgICAgICAgJ2xpc3QtaXRlbS1tZXRhJyxcclxuICAgICAgICAgICAgJ3RhYmxlLWNvbHVtbicsXHJcbiAgICAgICAgICAgICd0YWJsZS1jb2x1bW4tZ3JvdXAnLFxyXG4gICAgICAgICAgICAndGFiLXBhbmUnLFxyXG4gICAgICAgICAgICAndGFiLWNvbnRlbnQnLFxyXG4gICAgICAgICAgICAndGltZWxpbmUtaXRlbScsXHJcbiAgICAgICAgICAgICd0cmVlLW5vZGUnLFxyXG4gICAgICAgICAgICAnc2tlbGV0b24taW5wdXQnLFxyXG4gICAgICAgICAgICAnc2tlbGV0b24tYXZhdGFyJyxcclxuICAgICAgICAgICAgJ3NrZWxldG9uLXRpdGxlJyxcclxuICAgICAgICAgICAgJ3NrZWxldG9uLXBhcmFncmFwaCcsXHJcbiAgICAgICAgICAgICdza2VsZXRvbi1pbWFnZScsXHJcbiAgICAgICAgICAgICdza2VsZXRvbi1idXR0b24nLFxyXG4gICAgICAgICAgXVxyXG4gICAgICAgICAgLy8gXHU4RkQ5XHU5MUNDXHU2NjJGXHU5NzAwXHU4OTgxXHU5ODlEXHU1OTE2XHU1RjE1XHU1MTY1XHU2ODM3XHU1RjBGXHU3Njg0XHU1QjUwXHU3RUM0XHU0RUY2XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgICAvLyBcdTUzNTVcdTcyRUNcdTVGMTVcdTUxNjVcdTVCNTBcdTdFQzRcdTRFRjZcdTY1RjZcdTk3MDBcdTVGMTVcdTUxNjVcdTdFQzRcdTRFRjZcdTY4MzdcdTVGMEZcdUZGMENcdTU0MjZcdTUyMTlcdTRGMUFcdTU3MjhcdTYyNTNcdTUzMDVcdTU0MEVcdTVCRkNcdTgxRjRcdTVCNTBcdTdFQzRcdTRFRjZcdTY4MzdcdTVGMEZcdTRFMjJcdTU5MzFcclxuICAgICAgICAgIGNvbnN0IHJlcGxhY2VMaXN0ID0ge1xyXG4gICAgICAgICAgICAndHlwb2dyYXBoeS10ZXh0JzogJ3R5cG9ncmFwaHknLFxyXG4gICAgICAgICAgICAndHlwb2dyYXBoeS10aXRsZSc6ICd0eXBvZ3JhcGh5JyxcclxuICAgICAgICAgICAgJ3R5cG9ncmFwaHktcGFyYWdyYXBoJzogJ3R5cG9ncmFwaHknLFxyXG4gICAgICAgICAgICAndHlwb2dyYXBoeS1saW5rJzogJ3R5cG9ncmFwaHknLFxyXG4gICAgICAgICAgICAnZHJvcGRvd24tYnV0dG9uJzogJ2Ryb3Bkb3duJyxcclxuICAgICAgICAgICAgJ2lucHV0LXBhc3N3b3JkJzogJ2lucHV0JyxcclxuICAgICAgICAgICAgJ2lucHV0LXNlYXJjaCc6ICdpbnB1dCcsXHJcbiAgICAgICAgICAgICdpbnB1dC1ncm91cCc6ICdpbnB1dCcsXHJcbiAgICAgICAgICAgICdyYWRpby1ncm91cCc6ICdyYWRpbycsXHJcbiAgICAgICAgICAgICdjaGVja2JveC1ncm91cCc6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgICdsYXlvdXQtc2lkZXInOiAnbGF5b3V0JyxcclxuICAgICAgICAgICAgJ2xheW91dC1jb250ZW50JzogJ2xheW91dCcsXHJcbiAgICAgICAgICAgICdsYXlvdXQtZm9vdGVyJzogJ2xheW91dCcsXHJcbiAgICAgICAgICAgICdsYXlvdXQtaGVhZGVyJzogJ2xheW91dCcsXHJcbiAgICAgICAgICAgICdtb250aC1waWNrZXInOiAnZGF0ZS1waWNrZXInLFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBpZ25vcmVMaXN0LmluY2x1ZGVzKG5hbWUpXHJcbiAgICAgICAgICAgID8gJydcclxuICAgICAgICAgICAgOiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVwbGFjZUxpc3QsIG5hbWUpXHJcbiAgICAgICAgICAgID8gYGFudC1kZXNpZ24tdnVlL2VzLyR7KHJlcGxhY2VMaXN0IGFzIHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9KVtuYW1lXX0vc3R5bGUvaW5kZXhgXHJcbiAgICAgICAgICAgIDogYGFudC1kZXNpZ24tdnVlL2VzLyR7bmFtZX0vc3R5bGUvaW5kZXhgXHJcbiAgICAgICAgfSxcclxuICAgICAgfVxyXG4gICAgXSxcclxuICB9KVxyXG4gIHJldHVybiBzdHlsZUltcG9ydFBsdWdpblxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxwYWdlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS92dWUtYWRtaW4vYnVpbGQvcGx1Z2lucy9wYWdlcy50c1wiO2ltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb24gXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU4REVGXHU3NTMxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnUGFnZUltcG9ydFBsdWdpbigpIHtcclxuICByZXR1cm4gW1xyXG4gICAgUGFnZXMoe1xyXG4gICAgICByZXNvbHZlcjogJ3Z1ZScsXHJcbiAgICAgIGltcG9ydE1vZGU6ICdhc3luYycsXHJcbiAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICAnKiovY29tcG9uZW50cy8qKi8qJyxcclxuICAgICAgICAnKiovdXRpbHMvKiovKicsXHJcbiAgICAgICAgJyoqL2xpYi8qKi8qJyxcclxuICAgICAgICAnKiovaG9va3MvKiovKicsXHJcbiAgICAgICAgJyoqL21vZGVsLnRzJyxcclxuICAgICAgICAnKiovdGVzdHMvKiovKicsXHJcbiAgICAgICAgJyoqL19fdGVzdF9fLyoqLyonXHJcbiAgICAgIF1cclxuICAgIH0pXHJcbiAgXVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEyTyxTQUFTLGNBQWMsZUFBZTs7O0FDWTFRLFNBQVMsVUFBVSxZQUFtQztBQUMzRCxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUk7QUFFSixRQUFNLFFBQTRCLGFBQWEsS0FBSyxNQUFNLFdBQVcsUUFB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
