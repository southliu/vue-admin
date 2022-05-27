import { request } from '@/utils/request'

enum API {
  URL = '/platform/game',
  COMMON_URL = '/authority/common',
}

interface IResult {
  id: string;
  name: string;
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getGames(data?: unknown) {
  return request.get<IServerResult<IResult[]>>(
    `${API.COMMON_URL}/games`,
    { params: data }
  )
}
