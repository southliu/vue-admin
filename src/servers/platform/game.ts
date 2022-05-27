import type { DefaultOptionType } from 'ant-design-vue/lib/select';
import { request } from '@/utils/request'

enum API {
  URL = '/platform/game',
  COMMON_URL = '/authority/common',
}

interface IResult {
  id: string;
  name: string;
}

export function getGames(data?: unknown): Promise<DefaultOptionType[]> {
  return new Promise((resolve, reject) => {
    request.get<IServerResult<IResult[]>>(`${API.COMMON_URL}/games`, { params: data }).then(res => {
      const data: DefaultOptionType[] = []

      res.data.data.forEach(item => {
        data.push({
          label: item.name,
          value: item.id
        })
      })

      resolve(data)
    }).catch(() => reject([]))
  })
}

