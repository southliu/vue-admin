import type { IFormList } from "#/form"
import type { VxeGridPropTypes } from "vxe-table"
import { INPUT_REQUIRED, SELECT_REQUIRED } from "@/utils/config"
import { MENU_ACTIONS, MENU_MODULE, MENU_STATUS } from "@/utils/constants"

// 搜索数据
export const searchList: IFormList[] = [
  {
    title: '状态',
    key: 'status',
    component: 'Select',
    componentProps: {
      options: MENU_STATUS
    }
  },
  {
    title: '模块',
    key: 'module',
    wrapperCol: 170,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE
    }
  },
  {
    title: '控制器',
    key: 'controller',
    component: 'Input'
  }
]

// 新增数据
export const createList: (id: string) => IFormList[] = id => [
  {
    title: '名称',
    key: 'name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    title: '状态',
    key: 'status',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_STATUS
    }
  },
  {
    title: '模块',
    key: 'module',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE
    }
  },
  {
    title: '控制器',
    key: 'controller',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    title: '同时创建菜单',
    key: 'actions',
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