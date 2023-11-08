import type { FormList } from "#/form";
import type { TableProps } from "#/public";
import type { DefaultOptionType } from 'ant-design-vue/lib/select';
import { FORM_REQUIRED } from "@/utils/config";
import { MENU_TYPE } from "@/utils/constants";

export interface SystemMenuTree {
  children?: SystemMenuTree[];
  enable?: boolean;
  id: string;
  menuType: number;
  link?: boolean;
  menuName: string;
  menuNameEn: string;
  menuNo?: string;
  menuRoute: string;
  parentId?: string;
  permissions: string;
  sortNum?: number;
  visible?: boolean;
}

// 权限前缀
const permissionPrefix = '/authority/menu';

// 权限
export const pagePermission = {
  page: `${permissionPrefix}/index`,
  create: `${permissionPrefix}/create`,
  update: `${permissionPrefix}/update`,
  delete: `${permissionPrefix}/delete`,
};

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '菜单名称',
    name: 'menuName',
    component: 'Input'
  }
];

// 表格数据
export const tableColumns: TableProps[] = [
  {
    title: 'ID',
    field: 'id',
    treeNode: true,
    minWidth: 150
  },
  {
    title: '中文名称',
    field: 'menuName',
    minWidth: 100
  },
  {
    title: '接口权限',
    field: 'permissions',
    minWidth: 180
  },
  {
    title: '菜单路由',
    field: 'menuRoute',
    minWidth: 180
  },
  {
    title: '菜单类型',
    field: 'menuType',
    echoArr: MENU_TYPE,
    minWidth: 100
  },
  {
    title: '客户端',
    field: 'clientName',
    minWidth: 100
  },
  {
    title: '排序',
    field: 'sortNum',
    minWidth: 80
  },
  {
    title: '操作',
    field: 'operate',
    minWidth: 320,
    fixed: 'right',
    showOverflow: false,
    slots: { default: 'operate' }
  }
];

// 新增数据
export const createList = (parentList: DefaultOptionType[], menuType = 0): FormList[] => [
  {
    label: '中文名称',
    name: 'menuName',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 60,
    }
  },
  {
    label: '菜单编码',
    name: 'menuNo',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 60,
    }
  },
  {
    label: '接口权限',
    name: 'permissions',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 60,
    }
  },
  {
    label: '菜单类型',
    name: 'menuType',
    rules: FORM_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_TYPE
    }
  },
  {
    label: '菜单路由',
    name: 'menuRoute',
    rules: FORM_REQUIRED,
    hidden: menuType !== 1,
    component: 'Input'
  },
  {
    label: '排序',
    name: 'sortNum',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 20,
    }
  },
  {
    label: '父级菜单',
    name: 'parentId',
    component: 'TreeSelect',
    componentProps: {
      treeData: parentList,
      fieldNames: {
        label: 'menuName',
        value: 'id'
      }
    }
  },
];