import type { IFormList } from "#/form"
import type { VxeGridPropTypes } from "vxe-table"
import { INPUT_REQUIRED, SELECT_REQUIRED } from "@/utils/config"
import { MENU_ACTIONS, MENU_MODULE, MENU_STATUS } from "@/utils/constants"

// 搜索数据
export const searchList: IFormList[] = [
  {
    label: '状态',
    name: 'status',
    component: 'Select',
    componentProps: {
      options: MENU_STATUS
    }
  },
  {
    label: '模块',
    name: 'module',
    wrapperCol: 170,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE
    }
  },
  {
    label: '控制器',
    name: 'controller',
    component: 'Input'
  }
]

// 新增数据
export const createList: (id: string) => IFormList[] = id => [
  {
    label: '名称',
    name: 'name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '状态',
    name: 'status',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_STATUS
    }
  },
  {
    label: '模块',
    name: 'module',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE
    }
  },
  {
    label: '控制器',
    name: 'controller',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '同时创建菜单',
    name: 'actions',
    hidden: !!id,
    component: 'CheckboxGroup',
    componentProps: {
      options: MENU_ACTIONS
    }
  },
]

// 表格数据
export const tableColumns: VxeGridPropTypes.Columns = [
  {
    title: 'ID',
    field: 'id'
  },
  {
    title: '名称',
    field: 'name'
  },
  {
    title: '状态',
    field: 'status'
  },
  {
    title: '模块',
    field: 'module'
  },
  {
    title: '控制器',
    field: 'controller'
  },
  {
    title: '创建时间',
    field: 'created_at',
    minWidth: 140
  },
  {
    title: '更新时间',
    field: 'updated_at',
    minWidth: 140
  },
  {
    title: '操作',
    field: 'operate',
    minWidth: 160,
    showOverflow: false,
    slots: { default: 'operate' }
  }
]