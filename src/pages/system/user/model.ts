import type { FormList } from "#/form";
import type { TableColumnsProps } from "#/public";
import { FORM_REQUIRED } from "@/utils/config";
import { OPEN_CLOSE } from "@/utils/constants";
import { PHONE_RULE } from "@/utils/verify";

// 权限前缀
const permissionPrefix = '/authority/user';

// 权限
export const pagePermission = {
  page: `${permissionPrefix}/index`,
  create: `${permissionPrefix}/create`,
  update: `${permissionPrefix}/update`,
  delete: `${permissionPrefix}/delete`,
  permission: `${permissionPrefix}/authority`
};

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '年龄',
    name: 'age',
    component: 'InputNumber'
  },
  {
    label: '名字',
    name: 'keyword',
    component: 'Input'
  }
];

// 表格数据
export const tableColumns: TableColumnsProps[] = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '姓名',
    dataIndex: 'real_name'
  },
  {
    title: '角色',
    dataIndex: 'roles_name'
  },
  {
    title: '手机号',
    dataIndex: 'phone'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 160,
    ellipsis: false,
  },
];

// 新增数据
export const createList: FormList[] = [
  {
    label: '嵌套数据',
    name: ['user', 'name', 'test'],
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32
    }
  },
  {
    label: '用户名',
    name: 'username',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32
    }
  },
  {
    label: '姓名',
    name: 'real_name',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32
    }
  },
  {
    label: '角色',
    name: 'roles_name',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32
    }
  },
  {
    label: '电话',
    name: 'phone',
    rules: [
      { required: true },
      PHONE_RULE
    ],
    component: 'Input',
    componentProps: {
      maxlength: 20
    }
  },
  {
    label: '状态',
    name: 'status',
    rules: FORM_REQUIRED,
    component: 'Select',
    componentProps: {
      options: OPEN_CLOSE
    }
  }
];