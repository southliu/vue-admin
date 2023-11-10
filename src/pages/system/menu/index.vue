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
      :data="handleFlatMenu(tableData)"
      :columns="tableColumns"
      :isLoading="isLoading"
      :options="{
        treeConfig: { transform: true },
        expandConfig: { reserve: true },
        rowConfig: { keyField: 'id' },
      }"
    >
      <template v-slot:operate='{ record }'>
        <UpdateBtn
          v-if="checkPermission(pagePermission.update)"
          class="mr-2"
          :isLoading="isCreateLoading"
          @click="onUpdate(record)"
        />
        <DeleteBtn
          v-if="checkPermission(pagePermission.delete)"
          class="mr-2"
          :isLoading="isLoading"
          @click="handleDelete(record.id)"
        />
        <BasicBtn
          v-if="checkPermission(pagePermission.create)"
          :isLoading="isLoading"
          @click="onCreate(record.id)"
        >
          添加下级菜单
        </BasicBtn>
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
      :list="createList(handleFilterParent(tableData), creates.data?.menuType as number)"
      :labelCol="{ span: 6 }"
      :data="creates.data"
      @handleFinish="handleCreate"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
import type { FormData } from '#/form';
import type { BasicFormProps } from '@/components/Form/model';
import type { CreateData, TableData } from '#/public';
import { message } from 'ant-design-vue';
import { onActivated, reactive, shallowRef, ref } from 'vue';
import { UpdateBtn, DeleteBtn, BasicBtn } from '@/components/Buttons';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';
import { checkPermission } from "@/utils/permissions";
import { handleFlatMenu } from '@/utils/menu';
import {
  searchList,
  createList,
  tableColumns,
  pagePermission
} from './model';
import {
  getSystemMenuTree,
  getSystemMenuById,
  createSystemMenu,
  updateSystemMenu,
  deleteSystemMenu
} from '@/servers/system/menu';
import BasicContent from '@/components/Content/BasicContent.vue';
import BasicTable from '@/components/Table/BasicTable.vue';
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
  sortNum: 1,
  parentId: '0'
};

// 搜索数据
const searchData = ref<FormData>({});

// 新增数据
const creates = reactive<CreateData>({
  id: '',
  isOpen: false,
  title: ADD_TITLE,
  data: {...initCreate},
  type: 'create'
});

// 表格数据
const tableData = ref<TableData[]>([]);

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
 * 父级菜单处理
 * @param list - 表格列表
 */
const handleFilterParent = (list: TableData[]): TableData[] => {
  const result: TableData[] = [
    {
      menuName: '顶级菜单',
      id: '0',
      children: list
    }
  ];

  return result;
};

/**
 * 搜索提交
 * @param values - 表单返回数据
 */
const handleSearch = async (values: FormData) => {
  searchData.value = values;
  const query = { ...values };
  try {
    isLoading.value = true;
    const { code, data } = await getSystemMenuTree(query);
    if (Number(code) !== 200) return;
    tableData.value = JSON.parse(JSON.stringify(data));
  } finally {
    isLoading.value = false;
  }
};

/** 点击新增 */
const onCreate = (id?: string) => {
  creates.isOpen = !creates.isOpen;
  creates.title = ADD_TITLE;
  creates.id = id || '';
  creates.type = 'create';
  const params = {...initCreate};
  params.parentId = id || params.parentId || '';
  creates.data = params;
};

/**
 * 点击编辑
 * @param record - 当前行数据
 */
const onUpdate = async (record: FormData) => {
  const { id, menuName } = record;
  creates.isOpen = !creates.isOpen;
  creates.id = id as string;
  creates.title = EDIT_TITLE(menuName as string);
  creates.type = 'update';

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
const handleCreate = async () => {
  try {
    isCreateLoading.value = true;
    const functions = creates.type === 'update' ? updateSystemMenu(creates.id, creates.data) : createSystemMenu(creates.data);
    const { code } = await functions;
    if (Number(code) !== 200) return;
    getPage();
    creates.id = '';
    creates.isOpen = false;
    creates.data = {...initCreate};
    createFormRef.value?.handleReset();
    message.success('操作成功');
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
    const { code } = await deleteSystemMenu(id as string);
    if (Number(code) === 200) {
      message.success('删除成功');
      getPage();
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
