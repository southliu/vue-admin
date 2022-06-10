import { ISystemMenu, ISystemMenuResult } from '@/pages/systems/menu/model'
import { request } from '@/utils/request'

enum API {
  URL = '/authority/menu',
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getMenuPage(data: Partial<ISystemMenu> & IPaginationData) {
  return request.get<IPageServerResult<ISystemMenuResult[]>>(
    `${API.URL}/index`,
    { params: data }
  )
}

/**
 * 根据ID获取数据
 * @param id - ID
 * @param data - 请求数据
 */
export function getMenuById(id: string) {
  return request.get(`${API.URL}/${id}`)
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createMenu(data: unknown) {
  return request.post(API.URL, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateMenu(id: string, data: unknown) {
  return request.put(`${API.URL}/${id}`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
 export function deleteMenu(id: string) {
  return request.delete(`${API.URL}/${id}`)
}
