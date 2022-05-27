import { request } from '@/utils/request'

enum API {
  URL = '/platform/partner',
}

interface IResult {
  id: string;
  name: string;
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getPartner(data?: unknown) {
  return request.get<IServerResult<IResult[]>>(`${API.URL}`, { params: data })
}
