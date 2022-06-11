import type { IFormList } from "@/types/form"
import { DATE_FORMAT, GAME_PACKAGE_TYPE, SOURCE_TYPE } from "@/utils/constants"

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
    title: '包类型',
    key: 'package_types',
    wrapperCol: 150,
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: GAME_PACKAGE_TYPE
    }
  },
  {
    title: '合作公司',
    key: 'partners',
    wrapperCol: 300,
    component: 'PartnerSelect'
  },
  {
    title: '来源',
    key: 'source',
    component: 'Select',
    componentProps: {
      options: SOURCE_TYPE
    }
  },
  {
    title: '全服充值',
    key: 'all_pay',
    wrapperCol: 15,
    component: 'Checkbox'
  },
  {
    title: '新增充值',
    key: 'new_pay',
    wrapperCol: 15,
    component: 'Checkbox'
  },
  {
    title: '注册',
    key: 'register',
    wrapperCol: 15,
    component: 'Checkbox'
  },
  {
    title: '登录',
    key: 'active',
    wrapperCol: 15,
    component: 'Checkbox'
  },
  {
    title: '累积登录',
    key: 'active_total',
    wrapperCol: 15,
    component: 'Checkbox'
  }
]