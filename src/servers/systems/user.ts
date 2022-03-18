import { request } from '@/utils/request'
import { ISystemUser } from '@/pages/systems/user/model'

enum API {
  URL = '/user'
}

// 获取分页数据
function getPage(data: ISystemUser) {
  return request.get(API.URL, { data })
}

// 新增数据
function create(data: ISystemUser) {
  return request.post(API.URL, data)
}

export default {
  getPage,
  create
}