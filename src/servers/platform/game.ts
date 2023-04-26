import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'
import { recursiveData } from '@/utils/helper'

enum API {
  URL = '/platform/game',
  COMMON_URL = '/authority/common',
}

interface ResultData {
  id: string;
  name: string;
  children?: ResultData[];
}

export function getGames(data?: unknown): Promise<DefaultOptionType[]> {
  return new Promise((resolve, reject) => {
    request.get<ServerResult<ResultData[]>>(`${API.COMMON_URL}/games`, { params: data }).then(res => {

      // 递归数据
     const result = recursiveData<ResultData, DefaultOptionType>(res?.data?.data, item => {
        const { id, name } = item
        const filterData = {
          value: id,
          label: `${id}:${name}`
        }
        return filterData
      })

      resolve(result)
    }).catch(() => reject([]))
  })
}
