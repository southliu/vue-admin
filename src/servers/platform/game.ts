import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

enum API {
  COMMON_URL = '/authority/common',
}

interface ResultData {
  id: string;
  name: string;
  children?: ResultData[];
}

/**
 * 获取游戏数据
 * @param data - 请求数据
 */
export function getGames(data?: unknown) {
  return request.get(
    `${API.COMMON_URL}/games`,
    { params: data }
  ) as Promise<ServerResult<ResultData[]>>
}
