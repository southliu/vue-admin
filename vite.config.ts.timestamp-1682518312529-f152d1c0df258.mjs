// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/case/vue-admin/node_modules/.pnpm/vite@4.3.0-beta.8_uakuilq6iygkg5ll5cv37w4i7m/node_modules/vite/dist/node/index.js";

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
      // ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), "")
    };
  }
  return res;
}

// build/plugins/index.ts
import { AntDesignVueResolver } from "file:///D:/case/vue-admin/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.1+vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { presetUno, presetAttributify, presetIcons } from "file:///D:/case/vue-admin/node_modules/.pnpm/unocss@0.28.3/node_modules/unocss/dist/index.mjs";

// build/plugins/styleImport.ts
import { createStyleImportPlugin } from "file:///D:/case/vue-admin/node_modules/.pnpm/vite-plugin-style-import@2.0.0_vite@4.3.0-beta.8/node_modules/vite-plugin-style-import/dist/index.mjs";
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
import Pages from "file:///D:/case/vue-admin/node_modules/.pnpm/vite-plugin-pages@0.27.1_uukf66bbexbpo7cmauy5po7gbe/node_modules/vite-plugin-pages/dist/index.mjs";
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

// build/plugins/time.ts
var timePlugin = () => {
  return {
    name: "vite-build-time",
    enforce: "pre",
    apply: "build",
    buildStart: () => {
      console.time("\u6253\u5305\u65F6\u95F4");
    },
    buildEnd: () => {
    },
    // 在服务器关闭时被调用
    closeBundle: () => {
      console.timeEnd("\u6253\u5305\u65F6\u95F4");
    }
  };
};

// build/plugins/index.ts
import { visualizer } from "file:///D:/case/vue-admin/node_modules/.pnpm/rollup-plugin-visualizer@5.8.3_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import vue from "file:///D:/case/vue-admin/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_rcwu3mb5k6zp3k6ehkdil7qzry/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/case/vue-admin/node_modules/.pnpm/unplugin-auto-import@0.6.9_n54e6xd7ofkp7kuyzhdprxd35e/node_modules/unplugin-auto-import/dist/vite.mjs";
import PurgeIcons from "file:///D:/case/vue-admin/node_modules/.pnpm/vite-plugin-purge-icons@0.8.2_vite@4.3.0-beta.8/node_modules/vite-plugin-purge-icons/dist/index.mjs";
import Components from "file:///D:/case/vue-admin/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.1+vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import Unocss from "file:///D:/case/vue-admin/node_modules/.pnpm/unocss@0.28.3/node_modules/unocss/dist/vite.mjs";
import vueJsx from "file:///D:/case/vue-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.0_rcwu3mb5k6zp3k6ehkdil7qzry/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import viteCompression from "file:///D:/case/vue-admin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.3.0-beta.8/node_modules/vite-plugin-compression/dist/index.mjs";
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
    // 压缩包
    viteCompression(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts"
    }),
    Components({
      resolvers: [
        AntDesignVueResolver()
      ]
    }),
    // 包分析
    visualizer({
      gzipSize: true,
      brotliSize: true
    }),
    // 打包时间
    timePlugin(),
    // css按需加载
    configStyleImportPlugin(),
    // 自动生成路由
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
      // 跨域处理
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wcm94eS50cyIsICJidWlsZC9wbHVnaW5zL2luZGV4LnRzIiwgImJ1aWxkL3BsdWdpbnMvc3R5bGVJbXBvcnQudHMiLCAiYnVpbGQvcGx1Z2lucy9wYWdlcy50cyIsICJidWlsZC9wbHVnaW5zL3RpbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvdnVlLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGhhbmRsZUVudiB9IGZyb20gJy4vYnVpbGQvdXRpbHMnXG5pbXBvcnQgeyBjcmVhdGVQcm94eSB9IGZyb20gJy4vYnVpbGQvdml0ZS9wcm94eSdcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC9wbHVnaW5zJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKVxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpXG4gIGNvbnN0IHZpdGVFbnYgPSBoYW5kbGVFbnYoZW52KVxuICBjb25zdCB7IFZJVEVfU0VSVkVSX1BPUlQsIFZJVEVfUFJPWFkgfSA9IHZpdGVFbnZcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKCksXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiAnL3NyYycsXG4gICAgICAgICcjJzogJy90eXBlcydcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52Jzoge31cbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogVklURV9TRVJWRVJfUE9SVCxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICAvLyBcdThERThcdTU3REZcdTU5MDRcdTc0MDZcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eShWSVRFX1BST1hZKVxuICAgIH0sXG4gICAgdGVzdDoge1xuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBzZXR1cEZpbGVzOiAnLi90ZXN0cy9pbmRleC50cydcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBsZXNzOiB7XG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgIG1pbmlmeTogZmFsc2UsXG4gICAgICBicm90bGlTaXplOiBmYWxzZSxcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBrZWVwX2luZmluaXR5OiB0cnVlLFxuICAgICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxcdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvdnVlLWFkbWluL2J1aWxkL3V0aWxzLnRzXCI7dHlwZSBFbnZDb25maWdzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuXG4vLyBlbnZcdTY1NzBcdTYzNkVcbmludGVyZmFjZSBWaXRlRW52IHtcbiAgVklURV9TRVJWRVJfUE9SVDogbnVtYmVyO1xuICBWSVRFX1BST1hZOiBbc3RyaW5nLCBzdHJpbmddW107XG59XG5cbi8qKlxuICogXHU1OTA0XHU3NDA2XHU4RjZDXHU1MzE2ZW52XG4gKiBAcGFyYW0gZW52Q29uZmlncyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVudihlbnZDb25maWdzOiBFbnZDb25maWdzKTogVml0ZUVudiB7XG4gIGNvbnN0IHtcbiAgICBWSVRFX1NFUlZFUl9QT1JULFxuICAgIFZJVEVfUFJPWFlcbiAgfSA9IGVudkNvbmZpZ3NcblxuICBjb25zdCBwcm94eTogW3N0cmluZywgc3RyaW5nXVtdID0gVklURV9QUk9YWSA/IEpTT04ucGFyc2UoVklURV9QUk9YWS5yZXBsYWNlKC8nL2csICdcIicpKSA6IFtdXG5cbiAgY29uc3QgcmVzOiBWaXRlRW52ID0ge1xuICAgIFZJVEVfU0VSVkVSX1BPUlQ6IE51bWJlcihWSVRFX1NFUlZFUl9QT1JUKSB8fCA4MDgwLFxuICAgIFZJVEVfUFJPWFk6IHByb3h5XG4gIH1cblxuICByZXR1cm4gcmVzXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3Z1ZS1hZG1pbi9idWlsZC92aXRlL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tIFwidml0ZVwiXG5cbnR5cGUgUHJveHlMaXN0ID0gW3N0cmluZywgc3RyaW5nXVtdXG5cbnR5cGUgUHJveHlUYXJnZXRMaXN0ID0gUmVjb3JkPHN0cmluZywgUHJveHlPcHRpb25zPlxuXG4vKipcbiAqIFx1NTIxQlx1NUVGQVx1OERFOFx1NTdERlxuICogQHBhcmFtIGxpc3QgLSBcdTRFOENcdTdFRjRcdTY1NzBcdTdFQzRcdTUzQzJcdTY1NzBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XG4gIGNvbnN0IHJlczogUHJveHlUYXJnZXRMaXN0ID0ge31cbiAgXG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XG4gICAgcmVzW2BeJHtwcmVmaXh9YF0gPSB7XG4gICAgICB0YXJnZXQsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAvLyB3czogdHJ1ZSxcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXNcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2Nhc2UvdnVlLWFkbWluL2J1aWxkL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7IHByZXNldFVubywgcHJlc2V0QXR0cmlidXRpZnksIHByZXNldEljb25zIH0gZnJvbSAndW5vY3NzJ1xuaW1wb3J0IHsgY29uZmlnU3R5bGVJbXBvcnRQbHVnaW4gfSBmcm9tICcuL3N0eWxlSW1wb3J0J1xuaW1wb3J0IHsgY29uZmlnUGFnZUltcG9ydFBsdWdpbiB9IGZyb20gJy4vcGFnZXMnXG5pbXBvcnQgeyB0aW1lUGx1Z2luIH0gZnJvbSAnLi90aW1lJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBQdXJnZUljb25zIGZyb20gJ3ZpdGUtcGx1Z2luLXB1cmdlLWljb25zJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnMoKSB7XG4gIC8vIFx1NjNEMlx1NEVGNlx1NTNDMlx1NjU3MFxuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbiB8IFBsdWdpbltdKVtdID0gW1xuICAgIHZ1ZSgpLFxuICAgIFB1cmdlSWNvbnMoe30pLFxuICAgIFVub2Nzcyh7XG4gICAgICBwcmVzZXRzOiBbXG4gICAgICAgIHByZXNldFVubygpLCBcbiAgICAgICAgcHJlc2V0QXR0cmlidXRpZnkoKSwgXG4gICAgICAgIHByZXNldEljb25zKClcbiAgICAgIF0sXG4gICAgfSksXG4gICAgdnVlSnN4KHt9KSxcbiAgICAvLyBcdTUzOEJcdTdGMjlcdTUzMDVcbiAgICB2aXRlQ29tcHJlc3Npb24oKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICBdLFxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJ1xuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKClcbiAgICAgIF1cbiAgICB9KSxcbiAgICAvLyBcdTUzMDVcdTUyMDZcdTY3OTBcbiAgICB2aXN1YWxpemVyKHtcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICB9KSxcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTY1RjZcdTk1RjRcbiAgICB0aW1lUGx1Z2luKCksXG4gICAgLy8gY3NzXHU2MzA5XHU5NzAwXHU1MkEwXHU4RjdEXG4gICAgY29uZmlnU3R5bGVJbXBvcnRQbHVnaW4oKSxcbiAgICAvLyBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcbiAgICBjb25maWdQYWdlSW1wb3J0UGx1Z2luKClcbiAgXVxuXG4gIHJldHVybiB2aXRlUGx1Z2luc1xufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2FzZVxcXFx2dWUtYWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxzdHlsZUltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS92dWUtYWRtaW4vYnVpbGQvcGx1Z2lucy9zdHlsZUltcG9ydC50c1wiOy8qKlxuICogQGRlc2NyaXB0aW9uIFx1NjgzN1x1NUYwRlx1NjMwOVx1OTcwMFx1NTJBMFx1OEY3RFxuICovXG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ1N0eWxlSW1wb3J0UGx1Z2luKCkge1xuICBjb25zdCBzdHlsZUltcG9ydFBsdWdpbiA9IGNyZWF0ZVN0eWxlSW1wb3J0UGx1Z2luKHtcbiAgICBsaWJzOiBbXG4gICAgICB7XG4gICAgICAgIGxpYnJhcnlOYW1lOiAnYW50LWRlc2lnbi12dWUnLFxuICAgICAgICBlc01vZHVsZTogdHJ1ZSxcbiAgICAgICAgcmVzb2x2ZVN0eWxlOiAobmFtZSkgPT4ge1xuICAgICAgICAgIC8vIFx1OEZEOVx1OTFDQ1x1NjYyRlx1NjVFMFx1OTcwMFx1OTg5RFx1NTkxNlx1NUYxNVx1NTE2NVx1NjgzN1x1NUYwRlx1NjU4N1x1NEVGNlx1NzY4NFx1MjAxQ1x1NUI1MFx1N0VDNFx1NEVGNlx1MjAxRFx1NTIxN1x1ODg2OFxuICAgICAgICAgIGNvbnN0IGlnbm9yZUxpc3QgPSBbXG4gICAgICAgICAgICAnYW5jaG9yLWxpbmsnLFxuICAgICAgICAgICAgJ3N1Yi1tZW51JyxcbiAgICAgICAgICAgICdtZW51LWl0ZW0nLFxuICAgICAgICAgICAgJ21lbnUtZGl2aWRlcicsXG4gICAgICAgICAgICAnbWVudS1pdGVtLWdyb3VwJyxcbiAgICAgICAgICAgICdicmVhZGNydW1iLWl0ZW0nLFxuICAgICAgICAgICAgJ2JyZWFkY3J1bWItc2VwYXJhdG9yJyxcbiAgICAgICAgICAgICdmb3JtLWl0ZW0nLFxuICAgICAgICAgICAgJ3N0ZXAnLFxuICAgICAgICAgICAgJ3NlbGVjdC1vcHRpb24nLFxuICAgICAgICAgICAgJ3NlbGVjdC1vcHQtZ3JvdXAnLFxuICAgICAgICAgICAgJ2NhcmQtZ3JpZCcsXG4gICAgICAgICAgICAnY2FyZC1tZXRhJyxcbiAgICAgICAgICAgICdjb2xsYXBzZS1wYW5lbCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb25zLWl0ZW0nLFxuICAgICAgICAgICAgJ2xpc3QtaXRlbScsXG4gICAgICAgICAgICAnbGlzdC1pdGVtLW1ldGEnLFxuICAgICAgICAgICAgJ3RhYmxlLWNvbHVtbicsXG4gICAgICAgICAgICAndGFibGUtY29sdW1uLWdyb3VwJyxcbiAgICAgICAgICAgICd0YWItcGFuZScsXG4gICAgICAgICAgICAndGFiLWNvbnRlbnQnLFxuICAgICAgICAgICAgJ3RpbWVsaW5lLWl0ZW0nLFxuICAgICAgICAgICAgJ3RyZWUtbm9kZScsXG4gICAgICAgICAgICAnc2tlbGV0b24taW5wdXQnLFxuICAgICAgICAgICAgJ3NrZWxldG9uLWF2YXRhcicsXG4gICAgICAgICAgICAnc2tlbGV0b24tdGl0bGUnLFxuICAgICAgICAgICAgJ3NrZWxldG9uLXBhcmFncmFwaCcsXG4gICAgICAgICAgICAnc2tlbGV0b24taW1hZ2UnLFxuICAgICAgICAgICAgJ3NrZWxldG9uLWJ1dHRvbicsXG4gICAgICAgICAgXVxuICAgICAgICAgIC8vIFx1OEZEOVx1OTFDQ1x1NjYyRlx1OTcwMFx1ODk4MVx1OTg5RFx1NTkxNlx1NUYxNVx1NTE2NVx1NjgzN1x1NUYwRlx1NzY4NFx1NUI1MFx1N0VDNFx1NEVGNlx1NTIxN1x1ODg2OFxuICAgICAgICAgIC8vIFx1NTM1NVx1NzJFQ1x1NUYxNVx1NTE2NVx1NUI1MFx1N0VDNFx1NEVGNlx1NjVGNlx1OTcwMFx1NUYxNVx1NTE2NVx1N0VDNFx1NEVGNlx1NjgzN1x1NUYwRlx1RkYwQ1x1NTQyNlx1NTIxOVx1NEYxQVx1NTcyOFx1NjI1M1x1NTMwNVx1NTQwRVx1NUJGQ1x1ODFGNFx1NUI1MFx1N0VDNFx1NEVGNlx1NjgzN1x1NUYwRlx1NEUyMlx1NTkzMVxuICAgICAgICAgIGNvbnN0IHJlcGxhY2VMaXN0ID0ge1xuICAgICAgICAgICAgJ3R5cG9ncmFwaHktdGV4dCc6ICd0eXBvZ3JhcGh5JyxcbiAgICAgICAgICAgICd0eXBvZ3JhcGh5LXRpdGxlJzogJ3R5cG9ncmFwaHknLFxuICAgICAgICAgICAgJ3R5cG9ncmFwaHktcGFyYWdyYXBoJzogJ3R5cG9ncmFwaHknLFxuICAgICAgICAgICAgJ3R5cG9ncmFwaHktbGluayc6ICd0eXBvZ3JhcGh5JyxcbiAgICAgICAgICAgICdkcm9wZG93bi1idXR0b24nOiAnZHJvcGRvd24nLFxuICAgICAgICAgICAgJ2lucHV0LXBhc3N3b3JkJzogJ2lucHV0JyxcbiAgICAgICAgICAgICdpbnB1dC1zZWFyY2gnOiAnaW5wdXQnLFxuICAgICAgICAgICAgJ2lucHV0LWdyb3VwJzogJ2lucHV0JyxcbiAgICAgICAgICAgICdyYWRpby1ncm91cCc6ICdyYWRpbycsXG4gICAgICAgICAgICAnY2hlY2tib3gtZ3JvdXAnOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgJ2xheW91dC1zaWRlcic6ICdsYXlvdXQnLFxuICAgICAgICAgICAgJ2xheW91dC1jb250ZW50JzogJ2xheW91dCcsXG4gICAgICAgICAgICAnbGF5b3V0LWZvb3Rlcic6ICdsYXlvdXQnLFxuICAgICAgICAgICAgJ2xheW91dC1oZWFkZXInOiAnbGF5b3V0JyxcbiAgICAgICAgICAgICdtb250aC1waWNrZXInOiAnZGF0ZS1waWNrZXInLFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBpZ25vcmVMaXN0LmluY2x1ZGVzKG5hbWUpXG4gICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICA6IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXBsYWNlTGlzdCwgbmFtZSlcbiAgICAgICAgICAgID8gYGFudC1kZXNpZ24tdnVlL2VzLyR7KHJlcGxhY2VMaXN0IGFzIHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9KVtuYW1lXX0vc3R5bGUvaW5kZXhgXG4gICAgICAgICAgICA6IGBhbnQtZGVzaWduLXZ1ZS9lcy8ke25hbWV9L3N0eWxlL2luZGV4YFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIF0sXG4gIH0pXG4gIHJldHVybiBzdHlsZUltcG9ydFBsdWdpblxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjYXNlXFxcXHZ1ZS1hZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHBhZ2VzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jYXNlL3Z1ZS1hZG1pbi9idWlsZC9wbHVnaW5zL3BhZ2VzLnRzXCI7aW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThERUZcdTc1MzFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ1BhZ2VJbXBvcnRQbHVnaW4oKSB7XG4gIHJldHVybiBbXG4gICAgUGFnZXMoe1xuICAgICAgcmVzb2x2ZXI6ICd2dWUnLFxuICAgICAgaW1wb3J0TW9kZTogJ2FzeW5jJyxcbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgJyoqL2NvbXBvbmVudHMvKiovKicsXG4gICAgICAgICcqKi91dGlscy8qKi8qJyxcbiAgICAgICAgJyoqL2xpYi8qKi8qJyxcbiAgICAgICAgJyoqL2hvb2tzLyoqLyonLFxuICAgICAgICAnKiovbW9kZWwudHMnLFxuICAgICAgICAnKiovdGVzdHMvKiovKicsXG4gICAgICAgICcqKi9fX3Rlc3RfXy8qKi8qJ1xuICAgICAgXVxuICAgIH0pXG4gIF1cbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNhc2VcXFxcdnVlLWFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcdGltZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY2FzZS92dWUtYWRtaW4vYnVpbGQvcGx1Z2lucy90aW1lLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuXG4vKipcbiAqIFx1NjYzRVx1NzkzQVx1NjI1M1x1NTMwNVx1NjVGNlx1OTVGNFx1NjNEMlx1NEVGNlxuICovXG5leHBvcnQgY29uc3QgdGltZVBsdWdpbiA9ICgpOiBQbHVnaW5PcHRpb24gPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2aXRlLWJ1aWxkLXRpbWUnLFxuICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgIGJ1aWxkU3RhcnQ6ICgpID0+IHtcbiAgICAgIGNvbnNvbGUudGltZSgnXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0JylcbiAgICB9LFxuICAgIGJ1aWxkRW5kOiAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUudGltZUVuZCgnXFxuXHU2QTIxXHU1NzU3XHU4RjZDXHU0RTQ5XHU1QjhDXHU2MjEwXHU2NUY2XHU5NUY0JylcbiAgICB9LFxuICAgIC8vIFx1NTcyOFx1NjcwRFx1NTJBMVx1NTY2OFx1NTE3M1x1OTVFRFx1NjVGNlx1ODhBQlx1OEMwM1x1NzUyOFxuICAgIGNsb3NlQnVuZGxlOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZCgnXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0JylcbiAgICB9XG4gIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJPLFNBQVMsY0FBYyxlQUFlOzs7QUNZMVEsU0FBUyxVQUFVLFlBQWlDO0FBQ3pELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSTtBQUVKLFFBQU0sUUFBNEIsYUFBYSxLQUFLLE1BQU0sV0FBVyxRQUFRLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQztBQUU1RixRQUFNLE1BQWU7QUFBQSxJQUNuQixrQkFBa0IsT0FBTyxnQkFBZ0IsS0FBSztBQUFBLElBQzlDLFlBQVk7QUFBQSxFQUNkO0FBRUEsU0FBTztBQUNUOzs7QUNoQk8sU0FBUyxZQUFZLE9BQWtCLENBQUMsR0FBRztBQUNoRCxRQUFNLE1BQXVCLENBQUM7QUFFOUIsYUFBVyxDQUFDLFFBQVEsTUFBTSxLQUFLLE1BQU07QUFDbkMsUUFBSSxJQUFJLFFBQVEsSUFBSTtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxjQUFjO0FBQUE7QUFBQSxNQUVkLFNBQVMsVUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksUUFBUSxHQUFHLEVBQUU7QUFBQSxJQUM1RDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7OztBQ3RCQSxTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLFdBQVcsbUJBQW1CLG1CQUFtQjs7O0FDQzFELFNBQVMsK0JBQStCO0FBRWpDLFNBQVMsMEJBQTBCO0FBQ3hDLFFBQU0sb0JBQW9CLHdCQUF3QjtBQUFBLElBQ2hELE1BQU07QUFBQSxNQUNKO0FBQUEsUUFDRSxhQUFhO0FBQUEsUUFDYixVQUFVO0FBQUEsUUFDVixjQUFjLENBQUMsU0FBUztBQUV0QixnQkFBTSxhQUFhO0FBQUEsWUFDakI7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNB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
