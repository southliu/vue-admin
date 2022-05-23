import { ISystemUser, ISystemUserResult } from '@/pages/systems/user/model'
import { request } from '@/utils/request'

enum API {
  URL = '/authority/user',
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getSystemUserPage(data: Partial<ISystemUser> & IPaginationData) {
  return request.get<IPageServerResult<ISystemUserResult[]>>(
    API.URL + '/index',
    { params: data }
  )
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function create(data: ISystemUser) {
  return request.post(API.URL, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function update(id: string, data: ISystemUser) {
  return request.post(API.URL, data)
}
