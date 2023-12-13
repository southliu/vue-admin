import type { FormList } from "#/form";
import type { TableColumnsProps } from "#/public";
import { FORM_REQUIRED } from "@/utils/config";
import CustomizeInput from "./components/CustomizeInput.vue";

// 父路径
export const fatherPath = '/content/article';

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
export const tableColumns: TableColumnsProps[] = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '内容',
    dataIndex: 'content'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 160,
    ellipsis: false,
  }
];

// 新增数据
export const createList: FormList[] = [
  {
    label: '用户名',
    name: 'username',
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32,
      style: {
        width: '90%'
      }
    }
  },
  {
    label: '嵌套数据',
    name: ['user', 'name', 'test'],
    rules: FORM_REQUIRED,
    component: 'Input',
    componentProps: {
      maxlength: 32,
      style: {
        width: '90%'
      }
    }
  },
  {
    label: '标题',
    name: 'title',
    rules: FORM_REQUIRED,
    component: 'customize',
    render: CustomizeInput,
    componentProps: {
      maxlength: 32,
      style: {
        width: '90%'
      }
    }
  },
  {
    label: 'DEMO',
    name: 'demo',
    unit: '单位',
    extra: '我是说明,我是说明.',
    component: 'Input',
    componentProps: {
      maxlength: 32,
      style: {
        width: '90%'
      }
    }
  },
  {
    label: '内容',
    name: 'content',
    component: 'Editor',
    componentProps: {
      style: {
        width: '90%'
      }
    }
  }
];
