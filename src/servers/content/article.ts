import type { PageServerResult, PaginationData, ServerResult, TableData } from '#/public';
import { request } from '@/servers/request';

enum API {
  URL = '/content/article'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getArticlePage(data: PaginationData) {
  return request.get<PageServerResult<TableData[]>>(
    `${API.URL}/page`,
    { params: data }
  );
}

/**
 * 根据ID获取数据
 * @param id - 唯一标识
 */
export function getArticleById(id: string) {
  return request.get(`${API.URL}/detail?id=${id}`);
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createArticle(data: unknown) {
  return request.post(API.URL, data);
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateArticle(id: string, data: unknown) {
  return request.put(`${API.URL}/${id}`, data);
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteArticle(id: string) {
  return request.delete(`${API.URL}/${id}`) as Promise<ServerResult>;
}
