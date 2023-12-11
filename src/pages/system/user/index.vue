<template>
  <BasicContent :isPermission="checkPermission(pagePermission.page)">
    <template #top>
      <BasicSearch
        :list="searchList"
        :data="searchData"
        :isLoading="isLoading"
        @handleFinish="handleSearch"
      />
    </template>

    <BtnRow>
      <CreateBtn
        v-if="checkPermission(pagePermission.create)"
        @click="onCreate"
      />
    </BtnRow>

    <BasicTable
      :data="tableData"
      :columns="tableColumns"
      :isLoading="isLoading"
      :pagination="{
        current: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: handlePagination,
      }"
    >
      <template #status="{ record }">
        {{ record.status ? '开启' : '关闭' }}
      </template>

      <template #operate="{ record }">
        <BasicBtn
          v-if="checkPermission(pagePermission.permission)"
          class="btn-space"
          :isLoading="isLoading"
          @click="openPermission(record.id)"
        >
          权限
        </BasicBtn>
        <UpdateBtn
          v-if="checkPermission(pagePermission.update)"
          class="btn-space"
          :isLoading="isCreateLoading"
          @click="onUpdate(record)"
        />
        <DeleteBtn
          v-if="checkPermission(pagePermission.delete)"
          :isLoading="isLoading"
          @click="handleDelete(record.id)"
        />
      </template>
    </BasicTable>
  </BasicContent>

  <BasicModal
    v-model:isOpen="creates.isOpen"
    :isLoading="isCreateLoading"
    :title="creates.title"
    @handleFinish="createSubmit"
    @handleCancel="onCloseCreate"
  >
    <BasicForm
      ref="createFormRef"
      :list="createList"
      :labelCol="{ span: 6 }"
      :data="creates.data"
      @handleFinish="handleCreate"
    />
  </BasicModal>

  <PermissionDrawer
    :isOpen="permissionConfig.isOpen"
    :treeData="permissionConfig.treeData"
    :checkedKeys="permissionConfig.checkedKeys"
    @onClose="closePermission"
    @onSubmit="permissionSubmit"
  />
</template>

<script lang="ts" setup>
import type { FormData } from '#/form';
import type { BasicFormProps } from '@/components/Form/model';
import type { CreateData, TableData, PaginationData } from '#/public';
import type { DataNode } from 'ant-design-vue/lib/tree';
import type { Key } from 'ant-design-vue/lib/vc-tree/interface';
import { message } from 'ant-design-vue';
import { onActivated, reactive, shallowRef, ref } from 'vue';
import { checkPermission } from '@/utils/permissions';
import { ADD_TITLE, EDIT_TITLE, PAGE_SIZE } from '@/utils/config';
import { UpdateBtn, DeleteBtn, BasicBtn, CreateBtn } from '@/components/Buttons';
import { getPermission, savePermission } from '@/servers/system/menu';
import {
  searchList,
  createList,
  tableColumns,
  pagePermission
} from './model';
import {
  getSystemUserPage,
  getSystemUserById,
  createSystemUser,
  updateSystemUser,
  deleteSystemUser,
} from '@/servers/system/user';
import BtnRow from '@/components/BtnRow/index.vue';
import BasicContent from '@/components/Content/BasicContent.vue';
import BasicTable from '@/components/Table/BasicTable.vue';
import BasicSearch from '@/components/Search/BasicSearch.vue';
import BasicForm from '@/components/Form/BasicForm.vue';
import BasicModal from '@/components/Modal/BasicModal.vue';
import PermissionDrawer from './components/PermissionDrawer.vue';

interface PermissionConfig {
  id: string;
  isOpen: boolean;
  checkedKeys: Key[];
  treeData: DataNode[];
}

defineOptions({
  name: 'SystemUser'
});

const isLoading = ref(false);
const isCreateLoading = ref(false);
const createFormRef = shallowRef<BasicFormProps>();

// 权限配置
const permissionConfig = reactive<PermissionConfig>({
  id: '',
  isOpen: false,
  checkedKeys: [],
  treeData: []
});

// 初始化新增数据
const initCreate = {
  status: 1,
  user: { name: { test: '1234' } }
};

// 搜索数据
const searchData = ref<FormData>({});

// 新增数据
const creates = reactive<CreateData>({
  id: '',
  isOpen: false,
  title: ADD_TITLE,
  data: initCreate
});

// 表格数据
const tableData = ref<TableData[]>([]);

// 分页数据
const pagination = reactive<PaginationData>({
  total: 0,
  page: 1,
  pageSize: PAGE_SIZE,
});

onActivated(() => {
  getPage();
});

/** 获取表格数据 */
const getPage = async () => {
  const newPagination = { ...pagination };
  delete newPagination.total;
  const query = { ...newPagination, ...searchData.value };
  try {
    isLoading.value = true;
    const { code, data } = await getSystemUserPage(query);
    if (Number(code) !== 200) return;
    const { items, total } = data;
    tableData.value = items;
    pagination.total = Number(total) || 0;
  } finally {
    isLoading.value = false;
  }
};

/** 表格提交 */
const createSubmit = () => {
  createFormRef.value?.handleSubmit();
};

/**
 * 搜索提交
 * @param values - 表单返回数据
 */
const handleSearch = (values: FormData) => {
  searchData.value = values;
  pagination.page = 1;
  getPage();
};

/** 点击新增 */
const onCreate = () => {
  creates.isOpen = !creates.isOpen;
  creates.title = ADD_TITLE;
  creates.id = '';
  creates.data = initCreate;
};

/**
 * 点击编辑
 * @param record - 当前行数据
 */
const onUpdate = async (record: FormData) => {
  const { id, name } = record;
  creates.isOpen = !creates.isOpen;
  creates.id = id as string;
  creates.title = EDIT_TITLE(name as string);

  try {
    isCreateLoading.value = true;
    const { code, data } = await getSystemUserById(id as string);
    if (Number(code) !== 200) return;
    creates.data = data;
  } finally {
    isCreateLoading.value = false;
  }
};

/**
 * 新增/编辑提交
 * @param values - 表单返回数据
 */
const handleCreate = async (values: FormData) => {
  try {
    isCreateLoading.value = true;
    const functions = () => creates.id ? updateSystemUser(creates.id, values) : createSystemUser(values);
    const { code, message: resultMessage } = await functions();
    if (Number(code) !== 200) return;
    getPage();
    creates.id = '';
    creates.isOpen = false;
    creates.data = initCreate;
    createFormRef.value?.handleReset();
    message.success(resultMessage || '操作成功');
  } finally {
    isCreateLoading.value = false;
  }
};

/** 关闭新增/编辑 */
const onCloseCreate = () => {
  creates.isOpen = false;
};

/**
 * 删除
 * @param id - 唯一标识
 */
const handleDelete = async (id: string | number) => {
  try {
    isLoading.value = true;
    const data = await deleteSystemUser(id as string);
    if (data?.code === 200) {
      message.success(data?.message || '删除成功');
      getPage();
    }
  } finally {
    isLoading.value = false;
  }
};

/**
 * 分页
 * @param page - 当前页
 * @param pageSize - 分页总数
 */
const handlePagination = (page: number, pageSize: number) => {
  pagination.page = page;
  pagination.pageSize = pageSize;
  getPage();
};

/** 开启权限 */
const openPermission = async (id: string) => {
  try {
    isLoading.value = true;
    const params = { userId: id };
    const { code, data } = await getPermission(params);
    if (Number(code) !== 200) return;
    const { defaultCheckedKeys, treeData } = data;
    permissionConfig.id = id;
    permissionConfig.treeData = treeData;
    permissionConfig.checkedKeys = Object.values(defaultCheckedKeys);
    permissionConfig.isOpen = true;
  } finally {
    isLoading.value = false;
  }
};

/** 关闭权限 */
const closePermission = () => {
  permissionConfig.isOpen = false;
};

/**
 * 权限提交
 */
const permissionSubmit = async (checked: Key[]) => {
  try {
    isLoading.value = true;
    const params = {
      menuIds: checked,
      userId: permissionConfig.id
    };
    const data = await savePermission(params);
    message.success(data.message || '授权成功');
    permissionConfig.isOpen = false;
  } finally {
    isLoading.value = false;
  }
};
</script>
