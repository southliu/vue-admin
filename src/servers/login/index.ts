import type { ILoginData, ILoginResult } from '@/pages/login/model'
import { request } from '@/utils/request'

/**
 * 登录
 * @param data - 请求数据
 */
export function login(data: ILoginData) {
  return request.post<IServerResult<ILoginResult>>('/authority/user/login', data)
}
