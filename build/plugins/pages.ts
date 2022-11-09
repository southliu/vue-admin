import Pages from 'vite-plugin-pages'

/**
 * @description 自动生成路由
 */
export function configPageImportPlugin() {
  return [
    Pages({
      resolver: 'vue',
      importMode: 'async',
      exclude: [
        '**/components/**/*',
        '**/utils/**/*',
        '**/lib/**/*',
        '**/hooks/**/*',
        '**/model.ts',
        '**/tests/**/*',
        '**/__test__/**/*'
      ]
    })
  ]
}