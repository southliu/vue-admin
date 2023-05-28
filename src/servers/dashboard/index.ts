import type { DashboardResult } from '@/pages/dashboard/model'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

/**
 * 获取数据总览数据
 * @param data - 请求数据
 */
export function getDataTrends(data: object) {
  return request.get(
    '/dashboard',
    { params: data }
  ) as Promise<ServerResult<DashboardResult>>
}
