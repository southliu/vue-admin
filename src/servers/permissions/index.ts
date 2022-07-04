import type { ILoginData, ILoginResult } from '@/pages/login/model'
import { request } from '@/utils/request'

/**
 * 权限
 * @param data - 请求数据
 */
export function getPermissions(data: ILoginData) {
  return request.post<IServerResult<ILoginResult>>('/authority/user/refresh-permissions', data)
}
