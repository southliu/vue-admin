import type { FormList } from "#/form";
import type { TableColumnsProps } from "#/public";
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
export const tableColumns: TableColumnsProps[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 150
  },
  {
    title: '中文名称',
    dataIndex: 'menuName',
    width: 100
  },
  {
    title: '接口权限',
    dataIndex: 'permissions',
    width: 180
  },
  {
    title: '菜单路由',
    dataIndex: 'menuRoute',
    width: 180
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    echoArr: MENU_TYPE,
    width: 100
  },
  {
    title: '客户端',
    dataIndex: 'clientName',
    width: 100
  },
  {
    title: '排序',
    dataIndex: 'sortNum',
    width: 80
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 320,
    fixed: 'right',
    ellipsis: false,
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