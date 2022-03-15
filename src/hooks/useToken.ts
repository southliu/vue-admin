/**
 * token存取方法
 */
import { TOKEN } from '@/utils/config';
import Cookies from 'js-cookie'

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