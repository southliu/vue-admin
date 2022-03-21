import { ref } from 'vue';
import { TOKEN } from '@/utils/config'
import Cookies from 'js-cookie'

/**
 * token存取方法
 */
function useToken() {
  const token = ref(Cookies.get(TOKEN) || '')

  /** 获取token */
  const getToken = () => {
    return Cookies.get(TOKEN)
  }

  /**
   * 设置token
   * @param value token值
   */
  const setToken = (value: string) => {
    Cookies.set(TOKEN, value, { expires: 1 }) // 一天后过期
    token.value = value
  }

  /** 删除token */
   const removeToken = () => {
    Cookies.remove(TOKEN)
    token.value = ''
  }

  return {
    token,
    getToken,
    setToken,
    removeToken
  }
}

export default useToken