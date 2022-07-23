import type { ILoginResult } from '@/pages/login/model'
import type { IServerResult } from '@/types/global'
import { request } from '@/utils/request'

/**
 * 权限
 * @param data - 请求数据
 */
export function getPermissions(data: unknown) {
  return request.get<IServerResult<ILoginResult>>(
    '/authority/user/refresh-permissions',
    { params: data }
  )
}
