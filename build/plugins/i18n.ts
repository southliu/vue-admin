import VueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

/**
 * 创建i18n
 */
export const createI18n = () => {
  return VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    include: [path.resolve(__dirname, 'locales/**')],
  })
}