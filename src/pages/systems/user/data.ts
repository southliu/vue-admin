import type { IFormList } from "#/form"
import type { VxeGridPropTypes } from "vxe-table"
import { INPUT_REQUIRED, SELECT_REQUIRED } from "@/utils/config"
import { h } from "vue"
import { OPEN_CLOSE } from "@/utils/constants"

// 搜索数据
export const searchList: IFormList[] = [
  {
    title: '年龄',
    key: 'age',
    component: 'InputNumber'
  },
  {
    title: '名字',
    key: 'keyword',
    component: 'Input'
  }
]

// 新增数据
export const createList: IFormList[] = [
  {
    title: '嵌套数据',
    key: 'user.name.test',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    title: '用户名',
    key: 'username',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    title: '姓名',
    key: 'real_name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    title: '角色',
    key: 'roles_name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    title: '状态',
    key: 'status',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: OPEN_CLOSE
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