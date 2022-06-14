import type { IFormList } from "@/types/form"
import type { VxeGridPropTypes } from "vxe-table"
import { h } from "vue"

// 搜索数据
export const searchList: IFormList[] = [
  {
    title: '年龄',
    key: 'age',
    component: 'InputNumber'
  },
  {
    title: '名字',
    key: 'name',
    component: 'Input'
  }
]

// 新增数据
export const createList: IFormList[] = [
  {
    title: '用户名',
    key: 'username',
    component: 'Input'
  },
  {
    title: '姓名',
    key: 'real_name',
    component: 'Input'
  },
  {
    title: '角色',
    key: 'roles_name',
    component: 'Input'
  },
  {
    title: '类型',
    key: 'type',
    component: 'Select',
    componentProps: {
      options: [
        { label: '123', value: '123' },
        { label: '456', value: '456' },
      ]
    }
  }
]

// 表格数据
export const tableColumns: VxeGridPropTypes.Columns = [
  {
    title: 'ID',
    field: 'id'
  },
  {
    title: '用户名',
    field: 'username'
  },
  {
    title: '姓名',
    field: 'real_name'
  },
  {
    title: '角色',
    field: 'roles_name'
  },
  {
    title: '手机号',
    field: 'phone'
  },
  {
    title: '邮箱',
    field: 'email'
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => [
        h('span', { innerHTML: row.status ? '开启' : '关闭' })
      ]
    }
  },
  {
    title: '操作',
    field: 'operate',
    minWidth: 160,
    showOverflow: false,
    slots: { default: 'operate' }
  },
]