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
      <template #operate="{ record }">
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
</template>

<script lang="ts" setup>
import type { FormData } from '#/form';
import type { TableData, PaginationData } from '#/public';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { onActivated, reactive, ref } from 'vue';
import { UpdateBtn, DeleteBtn, CreateBtn } from '@/components/Buttons';
import { pagePermission, searchList, tableColumns } from './model';
import { checkPermission } from '@/utils/permissions';
import { usePublicStore } from '@/stores/public';
import { PAGE_SIZE } from '@/utils/config';
import { storeToRefs } from 'pinia';
import { getArticlePage, deleteArticle } from '@/servers/content/article';
import BtnRow from '@/components/BtnRow/index.vue';
import BasicContent from '@/components/Content/BasicContent.vue';
import BasicTable from '@/components/Table/BasicTable.vue';
import BasicSearch from '@/components/Search/BasicSearch.vue';

defineOptions({
  name: 'ContentArticle'
});

const router = useRouter();
const publicStore = usePublicStore();
const { setRefreshPage } = publicStore;
const { isRefreshPage } = storeToRefs(publicStore);
const isLoading = ref(false);
const isCreateLoading = ref(false);

// 搜索数据
const searchData = ref<FormData>({});

// 表格数据
const tableData = ref<TableData[]>([]);

// 分页数据
const pagination = reactive<PaginationData>({
  total: 0,
  page: 1,
  pageSize: PAGE_SIZE,
});

onActivated(() => {
  if (!isRefreshPage.value) {
    getPage();
  }
});

onActivated(() => {
  if (isRefreshPage.value) {
    getPage();
    setRefreshPage(false);
  }
});

/** 获取表格数据 */
const getPage = async () => {
  const newPagination = { ...pagination };
  delete newPagination.total;
  const query = { ...newPagination, ...searchData.value };
  try {
    isLoading.value = true;
    const { code, data } = await getArticlePage(query);
    if (Number(code) !== 200) return;
    const { items, total } = data;
    tableData.value = items;
    pagination.total = Number(total) || 0;
  } finally {
    isLoading.value = false;
  }
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
  router.push('/content/article/option?type=create');
};

/**
  * 点击编辑
  * @param record - 当前行数据
  */
const onUpdate = async (record: FormData) => {
  const { id } = record;
  router.push(`/content/article/option?type=update&id=${id as string}`);
};

/**
  * 删除
  * @param id - 唯一标识
  */
const handleDelete = async (id: string | number) => {
  try {
    isLoading.value = true;
    const data = await deleteArticle(id as string);
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
