<template>
  <BasicContent :isPermission="checkPermission(pagePermission.page)">
    <template #top>
      <BasicSearch
        :list="searchList"
        :data="searchData"
        :isLoading="isLoading"
        :isCreate="checkPermission(pagePermission.create)"
        @onCreate="onCreate"
        @handleFinish="handleSearch"
      />
    </template>

    <BasicTable
      :data="tableData"
      :columns="tableColumns"
      :isLoading="isLoading"
    >
      <template #operate="{ record }">
        <UpdateBtn
          v-if="checkPermission(pagePermission.update)"
          class="mr-2"
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

    <template #footer>
      <BasicPagination
        :page="pagination.page"
        :pageSize="pagination.pageSize"
        :total="pagination.total"
        :isLoading="isLoading"
        @handleChange="handlePagination"
      />
    </template>
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
      :list="createList(creates.id)"
      :labelCol="{ span: 6 }"
      :data="creates.data"
      @handleFinish="handleCreate"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
import type { FormData } from '#/form';
import type { BasicFormProps } from '@/components/Form/model';
import type { CreateData, TableData, PaginationData } from '#/public';
import { message } from 'ant-design-vue';
import { onActivated, reactive, shallowRef, ref } from 'vue';
import { UpdateBtn, DeleteBtn } from '@/components/Buttons';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';
import { checkPermission } from '@/utils/permissions';
import {
  getSystemMenuPage,
  getSystemMenuById,
  createSystemMenu,
  updateSystemMenu,
  deleteSystemMenu
} from '@/servers/system/menu';
import {
  searchList,
  createList,
  tableColumns,
  pagePermission
} from './model';
import BasicContent from '@/components/Content/BasicContent.vue';
import BasicTable from '@/components/Table/BasicTable.vue';
import BasicPagination from '@/components/Pagination/BasicPagination.vue';
import BasicSearch from '@/components/Search/BasicSearch.vue';
import BasicForm from '@/components/Form/BasicForm.vue';
import BasicModal from '@/components/Modal/BasicModal.vue';

defineOptions({
  name: 'SystemMenu'
});

const isLoading = ref(false);
const isCreateLoading = ref(false);
const createFormRef = shallowRef<BasicFormProps>();

// 初始化新增数据
const initCreate = {
  status: 1,
  module: 'authority'
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
  pageSize: 20,
});

onActivated(() => {
  getPage();
});

/** 获取表格数据 */
const getPage = async () => {
  handleSearch(searchData.value);
};

/** 表格提交 */
const createSubmit = () => {
  createFormRef.value?.handleSubmit();
};

/**
 * 搜索提交
 * @param values - 表单返回数据
 */
const handleSearch = async (values: FormData) => {
  searchData.value = values;
  const newPagination = { ...pagination };
  delete newPagination.total;
  const query = { ...newPagination, ...values };
  try {
    isLoading.value = true;
    const { code, data } = await getSystemMenuPage(query);
    if (Number(code) !== 200) return;
    const { items, total } = data;
    tableData.value = items;
    pagination.total = Number(total) || 0;
  } finally {
    isLoading.value = false;
  }
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
    const { code, data } = await getSystemMenuById(id as string);
    if (Number(code) !== 200) return;
    creates.data = (data || {}) as FormData;
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
    const functions = () => creates.id ? updateSystemMenu(creates.id, values) : createSystemMenu(values);
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
    const data = await deleteSystemMenu(id as string);
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
</script>
