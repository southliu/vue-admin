import { TOKEN } from '@/utils/config';
import Cookies from 'js-cookie'

/**
 * token存取方法
 * @param token - token值
 * @param remove - 是否删除token
 */
function useToken(token?: string | null, remove?: boolean) {
  if (remove) {
    Cookies.remove(TOKEN)
    return ''
  }
  if (token) Cookies.set(TOKEN, token, { expires: 1 })

  const tokenData = Cookies.get(TOKEN) || ''

  return tokenData
}

export default useToken