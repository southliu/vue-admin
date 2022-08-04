import type { ILoginData, ILoginResult } from '@/pages/login/model'
import type { IServerResult } from '#/global'
import { request } from '@/utils/request'

/**
 * 登录
 * @param data - 请求数据
 */
export function login(data: ILoginData) {
  return request.post<IServerResult<ILoginResult>>('/login', data)
}
