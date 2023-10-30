import { TITLE_SUFFIX } from '@/utils/config';

/**
 * 设置标题
 * @param newTitle - 新标题
 */
export function useTitle(newTitle: string) {
  const value = `${newTitle ? newTitle + '-' : ''}${TITLE_SUFFIX}`;
  document.title = value;
}