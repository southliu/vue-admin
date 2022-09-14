import { TITLE_SUFFIX } from '@/utils/config'
import { ref, watch } from 'vue'

/**
 * 设置标题
 * @param newTitle - 新标题
 */
export function useTitle(newTitle: string) {
  const value = newTitle ? `${newTitle}-${TITLE_SUFFIX}` : ''
  const title = ref(value ?? document?.title ?? null)

  watch(
    title,
    (value, oldValue) => {
      if (typeof value === 'string' && value !== oldValue && document) {
        document.title = title.value
      }
    },
    { immediate: true }
  )

  return title
}