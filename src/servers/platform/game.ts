import { request } from '@/servers/request';

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
  return request.get<ResultData[]>(
    `${API.COMMON_URL}/games`,
    { params: data }
  );
}
