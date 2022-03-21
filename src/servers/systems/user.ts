import { request } from '@/utils/request'
import { ISystemUser } from '@/pages/systems/user/model'

enum API {
  URL = '/user'
}

// 获取分页数据
export function getPage(data: ISystemUser) {
  return request.get(API.URL, { data })
}

// 新增数据
export function create(data: ISystemUser) {
  return request.post(API.URL, data)
}

// 修改数据
export function update(data: ISystemUser) {
  return request.post(API.URL, data)
}
