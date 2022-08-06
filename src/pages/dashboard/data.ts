import type { IFormList } from "#/form"
import { DATE_FORMAT } from "@/utils/constants"

// 搜索数据
export const searchList: IFormList[] = [
  {
    title: '日期',
    key: 'pay_date',
    component: 'DatePicker',
    componentProps: {
      allowClear: false,
      format: DATE_FORMAT
    }
  },
  {
    title: '游戏ID',
    key: 'game_ids',
    wrapperCol: 250,
    component: 'GameSelect',
  },
  {
    title: '合作公司',
    key: 'partners',
    wrapperCol: 300,
    component: 'PartnerSelect'
  },
  {
    title: '全服充值',
    key: 'all_pay',
    wrapperCol: 15,
    component: 'Checkbox'
  },
  {
    title: '注册',
    key: 'register',
    wrapperCol: 15,
    component: 'Checkbox'
  }
]