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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wcm94eS50cyIsICJidWlsZC9wbHVnaW5zL2luZGV4LnRzIiwgImJ1aWxkL3BsdWdpbnMvc3R5bGVJbXBvcnQudHMiLCAiYnVpbGQvcGx1Z2lucy9wYWdlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS92dWUtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBoYW5kbGVFbnYgfSBmcm9tICcuL2J1aWxkL3V0aWxzJ1xyXG5pbXBvcnQgeyBjcmVhdGVQcm94eSB9IGZyb20gJy4vYnVpbGQvdml0ZS9wcm94eSdcclxuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tICcuL2J1aWxkL3BsdWdpbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKClcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpXHJcbiAgY29uc3Qgdml0ZUVudiA9IGhhbmRsZUVudihlbnYpXHJcbiAgY29uc3QgeyBWSVRFX1NFUlZFUl9QT1JULCBWSVRFX1BST1hZIH0gPSB2aXRlRW52XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucygpLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogJy9zcmMnLFxyXG4gICAgICAgICcjJzogJy90eXBlcydcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAncHJvY2Vzcy5lbnYnOiB7fVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiBWSVRFX1NFUlZFUl9QT1JULFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICAvLyBcdThERThcdTU3REZcdTU5MDRcdTc0MDZcclxuICAgICAgcHJveHk6IGNyZWF0ZVByb3h5KFZJVEVfUFJPWFkpXHJcbiAgICB9LFxyXG4gICAgdGVzdDoge1xyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgc2V0dXBGaWxlczogJy4vdGVzdHMvaW5kZXgudHMnXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgICAgbWluaWZ5OiBmYWxzZSxcclxuICAgICAgYnJvdGxpU2l6ZTogZmFsc2UsXHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAga2VlcF9pbmZpbml0eTogdHJ1ZSxcclxuICAgICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS92dWUtYWRtaW4vYnVpbGQvdXRpbHMudHNcIjt0eXBlIElFbnZDb25maWdzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPlxyXG5cclxuLy8gZW52XHU2NTcwXHU2MzZFXHJcbmludGVyZmFjZSBJVml0ZUVudiB7XHJcbiAgVklURV9TRVJWRVJfUE9SVDogbnVtYmVyO1xyXG4gIFZJVEVfUFJPWFk6IFtzdHJpbmcsIHN0cmluZ11bXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NTkwNFx1NzQwNlx1OEY2Q1x1NTMxNmVudlxyXG4gKiBAcGFyYW0gZW52Q29uZmlncyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVFbnYoZW52Q29uZmlnczogSUVudkNvbmZpZ3MpOiBJVml0ZUVudiB7XHJcbiAgY29uc3Qge1xyXG4gICAgVklURV9TRVJWRVJfUE9SVCxcclxuICAgIFZJVEVfUFJPWFlcclxuICB9ID0gZW52Q29uZmlnc1xyXG5cclxuICBjb25zdCBwcm94eTogW3N0cmluZywgc3RyaW5nXVtdID0gVklURV9QUk9YWSA/IEpTT04ucGFyc2UoVklURV9QUk9YWS5yZXBsYWNlKC8nL2csICdcIicpKSA6IFtdXHJcblxyXG4gIGNvbnN0IHJlczogSVZpdGVFbnYgPSB7XHJcbiAgICBWSVRFX1NFUlZFUl9QT1JUOiBOdW1iZXIoVklURV9TRVJWRVJfUE9SVCkgfHwgODA4MCxcclxuICAgIFZJVEVfUFJPWFk6IHByb3h5XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvdnVlLWFkbWluL2J1aWxkL3ZpdGUvcHJveHkudHNcIjtpbXBvcnQgdHlwZSB7IFByb3h5T3B0aW9ucyB9IGZyb20gXCJ2aXRlXCJcclxuXHJcbnR5cGUgUHJveHlMaXN0ID0gW3N0cmluZywgc3RyaW5nXVtdXHJcblxyXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz5cclxuXHJcbi8qKlxyXG4gKiBcdTUyMUJcdTVFRkFcdThERThcdTU3REZcclxuICogQHBhcmFtIGxpc3QgLSBcdTRFOENcdTdFRjRcdTY1NzBcdTdFQzRcdTUzQzJcdTY1NzBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eShsaXN0OiBQcm94eUxpc3QgPSBbXSkge1xyXG4gIGNvbnN0IHJlczogUHJveHlUYXJnZXRMaXN0ID0ge31cclxuICBcclxuICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgbGlzdCkge1xyXG4gICAgcmVzW2BeJHtwcmVmaXh9YF0gPSB7XHJcbiAgICAgIHRhcmdldCxcclxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAvLyB3czogdHJ1ZSxcclxuICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fWApLCAnJyksXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvdnVlLWFkbWluL2J1aWxkL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgeyBwcmVzZXRVbm8sIHByZXNldEF0dHJpYnV0aWZ5LCBwcmVzZXRJY29ucyB9IGZyb20gJ3Vub2NzcydcclxuaW1wb3J0IHsgY29uZmlnU3R5bGVJbXBvcnRQbHVnaW4gfSBmcm9tICcuL3N0eWxlSW1wb3J0J1xyXG5pbXBvcnQgeyBjb25maWdQYWdlSW1wb3J0UGx1Z2luIH0gZnJvbSAnLi9wYWdlcydcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBQdXJnZUljb25zIGZyb20gJ3ZpdGUtcGx1Z2luLXB1cmdlLWljb25zJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnMoKSB7XHJcbiAgLy8gXHU2M0QyXHU0RUY2XHU1M0MyXHU2NTcwXHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW4gfCBQbHVnaW5bXSlbXSA9IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgUHVyZ2VJY29ucyh7fSksXHJcbiAgICBVbm9jc3Moe1xyXG4gICAgICBwcmVzZXRzOiBbXHJcbiAgICAgICAgcHJlc2V0VW5vKCksIFxyXG4gICAgICAgIHByZXNldEF0dHJpYnV0aWZ5KCksIFxyXG4gICAgICAgIHByZXNldEljb25zKClcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG4gICAgdnVlSnN4KHt9KSxcclxuICAgIC8vIFx1NTM4Qlx1N0YyOVx1NTMwNVxyXG4gICAgdml0ZUNvbXByZXNzaW9uKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgQW50RGVzaWduVnVlUmVzb2x2ZXIoKVxyXG4gICAgICBdXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICBBbnREZXNpZ25WdWVSZXNvbHZlcigpXHJcbiAgICAgIF1cclxuICAgIH0pLFxyXG4gICAgLy8gXHU1MzA1XHU1MjA2XHU2NzkwXHJcbiAgICB2aXN1YWxpemVyKHtcclxuICAgICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIC8vIGNzc1x1NjMwOVx1OTcwMFx1NTJBMFx1OEY3RFxyXG4gICAgY29uZmlnU3R5bGVJbXBvcnRQbHVnaW4oKSxcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OERFRlx1NzUzMVxyXG4gICAgY29uZmlnUGFnZUltcG9ydFBsdWdpbigpXHJcbiAgXVxyXG5cclxuICByZXR1cm4gdml0ZVBsdWdpbnNcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxzdHlsZUltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS92dWUtYWRtaW4vYnVpbGQvcGx1Z2lucy9zdHlsZUltcG9ydC50c1wiOy8qKlxyXG4gKiBAZGVzY3JpcHRpb24gXHU2ODM3XHU1RjBGXHU2MzA5XHU5NzAwXHU1MkEwXHU4RjdEXHJcbiAqL1xyXG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdTdHlsZUltcG9ydFBsdWdpbigpIHtcclxuICBjb25zdCBzdHlsZUltcG9ydFBsdWdpbiA9IGNyZWF0ZVN0eWxlSW1wb3J0UGx1Z2luKHtcclxuICAgIGxpYnM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGxpYnJhcnlOYW1lOiAnYW50LWRlc2lnbi12dWUnLFxyXG4gICAgICAgIGVzTW9kdWxlOiB0cnVlLFxyXG4gICAgICAgIHJlc29sdmVTdHlsZTogKG5hbWUpID0+IHtcclxuICAgICAgICAgIC8vIFx1OEZEOVx1OTFDQ1x1NjYyRlx1NjVFMFx1OTcwMFx1OTg5RFx1NTkxNlx1NUYxNVx1NTE2NVx1NjgzN1x1NUYwRlx1NjU4N1x1NEVGNlx1NzY4NFx1MjAxQ1x1NUI1MFx1N0VDNFx1NEVGNlx1MjAxRFx1NTIxN1x1ODg2OFxyXG4gICAgICAgICAgY29uc3QgaWdub3JlTGlzdCA9IFtcclxuICAgICAgICAgICAgJ2FuY2hvci1saW5rJyxcclxuICAgICAgICAgICAgJ3N1Yi1tZW51JyxcclxuICAgICAgICAgICAgJ21lbnUtaXRlbScsXHJcbiAgICAgICAgICAgICdtZW51LWRpdmlkZXInLFxyXG4gICAgICAgICAgICAnbWVudS1pdGVtLWdyb3VwJyxcclxuICAgICAgICAgICAgJ2JyZWFkY3J1bWItaXRlbScsXHJcbiAgICAgICAgICAgICdicmVhZGNydW1iLXNlcGFyYXRvcicsXHJcbiAgICAgICAgICAgICdmb3JtLWl0ZW0nLFxyXG4gICAgICAgICAgICAnc3RlcCcsXHJcbiAgICAgICAgICAgICdzZWxlY3Qtb3B0aW9uJyxcclxuICAgICAgICAgICAgJ3NlbGVjdC1vcHQtZ3JvdXAnLFxyXG4gICAgICAgICAgICAnY2FyZC1ncmlkJyxcclxuICAgICAgICAgICAgJ2NhcmQtbWV0YScsXHJcbiAgICAgICAgICAgICdjb2xsYXBzZS1wYW5lbCcsXHJcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbnMtaXRlbScsXHJcbiAgICAgICAgICAgICdsaXN0LWl0ZW0nLFxyXG4gICAgICAgICAgICAnbGlzdC1pdGVtLW1ldGEnLFxyXG4gICAgICAgICAgICAndGFibGUtY29sdW1uJyxcclxuICAgICAgICAgICAgJ3RhYmxlLWNvbHVtbi1ncm91cCcsXHJcbiAgICAgICAgICAgICd0YWItcGFuZScsXHJcbiAgICAgICAgICAgICd0YWItY29udGVudCcsXHJcbiAgICAgICAgICAgICd0aW1lbGluZS1pdGVtJyxcclxuICAgICAgICAgICAgJ3RyZWUtbm9kZScsXHJcbiAgICAgICAgICAgICdza2VsZXRvbi1pbnB1dCcsXHJcbiAgICAgICAgICAgICdza2VsZXRvbi1hdmF0YXInLFxyXG4gICAgICAgICAgICAnc2tlbGV0b24tdGl0bGUnLFxyXG4gICAgICAgICAgICAnc2tlbGV0b24tcGFyYWdyYXBoJyxcclxuICAgICAgICAgICAgJ3NrZWxldG9uLWltYWdlJyxcclxuICAgICAgICAgICAgJ3NrZWxldG9uLWJ1dHRvbicsXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgICAvLyBcdThGRDlcdTkxQ0NcdTY2MkZcdTk3MDBcdTg5ODFcdTk4OURcdTU5MTZcdTVGMTVcdTUxNjVcdTY4MzdcdTVGMEZcdTc2ODRcdTVCNTBcdTdFQzRcdTRFRjZcdTUyMTdcdTg4NjhcclxuICAgICAgICAgIC8vIFx1NTM1NVx1NzJFQ1x1NUYxNVx1NTE2NVx1NUI1MFx1N0VDNFx1NEVGNlx1NjVGNlx1OTcwMFx1NUYxNVx1NTE2NVx1N0VDNFx1NEVGNlx1NjgzN1x1NUYwRlx1RkYwQ1x1NTQyNlx1NTIxOVx1NEYxQVx1NTcyOFx1NjI1M1x1NTMwNVx1NTQwRVx1NUJGQ1x1ODFGNFx1NUI1MFx1N0VDNFx1NEVGNlx1NjgzN1x1NUYwRlx1NEUyMlx1NTkzMVxyXG4gICAgICAgICAgY29uc3QgcmVwbGFjZUxpc3QgPSB7XHJcbiAgICAgICAgICAgICd0eXBvZ3JhcGh5LXRleHQnOiAndHlwb2dyYXBoeScsXHJcbiAgICAgICAgICAgICd0eXBvZ3JhcGh5LXRpdGxlJzogJ3R5cG9ncmFwaHknLFxyXG4gICAgICAgICAgICAndHlwb2dyYXBoeS1wYXJhZ3JhcGgnOiAndHlwb2dyYXBoeScsXHJcbiAgICAgICAgICAgICd0eXBvZ3JhcGh5LWxpbmsnOiAndHlwb2dyYXBoeScsXHJcbiAgICAgICAgICAgICdkcm9wZG93bi1idXR0b24nOiAnZHJvcGRvd24nLFxyXG4gICAgICAgICAgICAnaW5wdXQtcGFzc3dvcmQnOiAnaW5wdXQnLFxyXG4gICAgICAgICAgICAnaW5wdXQtc2VhcmNoJzogJ2lucHV0JyxcclxuICAgICAgICAgICAgJ2lucHV0LWdyb3VwJzogJ2lucHV0JyxcclxuICAgICAgICAgICAgJ3JhZGlvLWdyb3VwJzogJ3JhZGlvJyxcclxuICAgICAgICAgICAgJ2NoZWNrYm94LWdyb3VwJzogJ2NoZWNrYm94JyxcclxuICAgICAgICAgICAgJ2xheW91dC1zaWRlcic6ICdsYXlvdXQnLFxyXG4gICAgICAgICAgICAnbGF5b3V0LWNvbnRlbnQnOiAnbGF5b3V0JyxcclxuICAgICAgICAgICAgJ2xheW91dC1mb290ZXInOiAnbGF5b3V0JyxcclxuICAgICAgICAgICAgJ2xheW91dC1oZWFkZXInOiAnbGF5b3V0JyxcclxuICAgICAgICAgICAgJ21vbnRoLXBpY2tlcic6ICdkYXRlLXBpY2tlcicsXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGlnbm9yZUxpc3QuaW5jbHVkZXMobmFtZSlcclxuICAgICAgICAgICAgPyAnJ1xyXG4gICAgICAgICAgICA6IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXBsYWNlTGlzdCwgbmFtZSlcclxuICAgICAgICAgICAgPyBgYW50LWRlc2lnbi12dWUvZXMvJHsocmVwbGFjZUxpc3QgYXMgeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0pW25hbWVdfS9zdHlsZS9pbmRleGBcclxuICAgICAgICAgICAgOiBgYW50LWRlc2lnbi12dWUvZXMvJHtuYW1lfS9zdHlsZS9pbmRleGBcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gIH0pXHJcbiAgcmV0dXJuIHN0eWxlSW1wb3J0UGx1Z2luXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHBhZ2VzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3Z1ZS1hZG1pbi9idWlsZC9wbHVnaW5zL3BhZ2VzLnRzXCI7aW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdQYWdlSW1wb3J0UGx1Z2luKCkge1xyXG4gIHJldHVybiBbXHJcbiAgICBQYWdlcyh7XHJcbiAgICAgIHJlc29sdmVyOiAndnVlJyxcclxuICAgICAgaW1wb3J0TW9kZTogJ2FzeW5jJyxcclxuICAgICAgZXhjbHVkZTogW1xyXG4gICAgICAgICcqKi9jb21wb25lbnRzLyoqLyonLFxyXG4gICAgICAgICcqKi91dGlscy8qKi8qJyxcclxuICAgICAgICAnKiovbGliLyoqLyonLFxyXG4gICAgICAgICcqKi9ob29rcy8qKi8qJyxcclxuICAgICAgICAnKiovbW9kZWwudHMnLFxyXG4gICAgICAgICcqKi90ZXN0cy8qKi8qJyxcclxuICAgICAgICAnKiovX190ZXN0X18vKiovKidcclxuICAgICAgXVxyXG4gICAgfSlcclxuICBdXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJPLFNBQVMsY0FBYyxlQUFlOzs7QUNZMVEsU0FBUyxVQUFVLFlBQW1DO0FBQzNELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSTtBQUVKLFFBQU0sUUFBNEIsYUFBYSxLQUFLLE1BQU0sV0FBVyxRQUFRLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQztBQUU1RixRQUFNLE1BQWdCO0FBQUEsSUFDcEIsa0JBQWtCLE9BQU8sZ0JBQWdCLEtBQUs7QUFBQSxJQUM5QyxZQUFZO0FBQUEsRUFDZDtBQUVBLFNBQU87QUFDVDs7O0FDaEJPLFNBQVMsWUFBWSxPQUFrQixDQUFDLEdBQUc7QUFDaEQsUUFBTSxNQUF1QixDQUFDO0FBRTlCLGFBQVcsQ0FBQyxRQUFRLE1BQU0sS0FBSyxNQUFNO0FBQ25DLFFBQUksSUFBSSxZQUFZO0FBQUEsTUFDbEI7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUVkLFNBQVMsVUFBUSxLQUFLLFFBQVEsSUFB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
