import type { FormList } from "#/form";
import type { TableProps } from "#/public";
import { INPUT_REQUIRED } from "@/utils/config";
import CustomizeInput from "./components/CustomizeInput.vue";

// 权限前缀
const permissionPrefix = '/content/article';

// 权限
export const pagePermission = {
  page: `${permissionPrefix}/index`,
  create: `${permissionPrefix}/create`,
  update: `${permissionPrefix}/update`,
  delete: `${permissionPrefix}/delete`
};

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '用户名',
    name: 'username',
    component: 'Input'
  },
  {
    label: '标题',
    name: 'title',
    component: 'Input'
  }
];

// 表格数据
export const tableColumns: TableProps[] = [
  {
    title: 'ID',
    field: 'id'
  },
  {
    title: '用户名',
    field: 'username',
  },
  {
    title: '标题',
    field: 'title'
  },
  {
    title: '内容',
    field: 'content'
  },
  {
    title: '操作',
    field: 'operate',
    minWidth: 160,
    showOverflow: false,
    slots: { default: 'operate' }
  }
];

// 新增数据
export const createList: FormList[] = [
  {
    label: '用户名',
    name: 'username',
    rules: INPUT_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32
    }
  },
  {
    label: '嵌套数据',
    name: ['user', 'name', 'test'],
    rules: INPUT_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32
    }
  },
  {
    label: '标题',
    name: 'title',
    rules: INPUT_REQUIRED,
    component: 'customize',
    render: CustomizeInput,
    componentProps: {
      maxlength: 32
    }
  },
  {
    label: '内容',
    name: 'content',
    component: 'Editor'
  }
];
