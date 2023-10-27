import type { PageServerResult, PaginationData, SideMenu, TableData } from '#/public';
import type { DataNode } from 'ant-design-vue/lib/tree';
import type { Key } from 'ant-design-vue/lib/vc-tree/interface';
import { request } from '@/servers/request';

enum API {
  URL = '/authority/menu',
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getSystemMenuPage(data: PaginationData) {
  return request.get<PageServerResult<TableData[]>>(
    `${API.URL}/page`,
    { params: data }
  );
}

/**
 * 获取当前菜单数据
 * @param data - 请求数据
 */
export function getMenuList(data?: unknown) {
  return request.get<SideMenu[]>(`/menu/list`, { params: data });
}

/**
 * 根据ID获取数据
 * @param id - ID
 */
export function getSystemMenuById(id: string) {
  return request.get(`${API.URL}/${id}`);
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createSystemMenu(data: unknown) {
  return request.post(API.URL, data);
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateSystemMenu(id: string, data: unknown) {
  return request.put(`${API.URL}/${id}`, data);
}

/**
 * 删除
 * @param id - 删除id值
 */
 export function deleteSystemMenu(id: string) {
  return request.delete(`${API.URL}/${id}`);
}

/**
 * 获取权限列表
 * @param data - 搜索数据
 */
 export function getPermission(data: unknown) {
  return request.get<{
    defaultCheckedKeys: Key[];
    treeData: DataNode[];
  }>(`${API.URL}/tree`, { params: data });
}

/**
 * 保存权限列表
 * @param data - 权限数据
 */
export function savePermission(data: unknown) {
  return request.put(`${API.URL}/authorize/save`, data);
}
