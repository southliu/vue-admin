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
      :data="tables"
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
</template>

<script lang="ts" setup>
import type { FormData } from '#/form';
import type { TableData, PaginationData } from '#/public';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useTitle } from '@/hooks/useTitle';
import { onActivated, onMounted, reactive, ref } from 'vue';
import { UpdateBtn, DeleteBtn } from '@/components/Buttons';
import { pagePermission, searchList, tableColumns } from './model';
import { checkPermission } from '@/utils/permissions';
import { usePublicStore } from '@/stores/public';
import { storeToRefs } from 'pinia';
import { getArticlePage, deleteArticle } from '@/servers/content/article';
import BasicContent from '@/components/Content/BasicContent.vue';
import BasicTable from '@/components/Table/BasicTable.vue';
import BasicPagination from '@/components/Pagination/BasicPagination.vue';
import BasicSearch from '@/components/Search/BasicSearch.vue';

defineOptions({
  name: 'ContentArticle'
});

useTitle('文章管理');
const router = useRouter();
const publicStore = usePublicStore();
const { setRefreshPage } = publicStore;
const { isRefreshPage } = storeToRefs(publicStore);
const isLoading = ref(false);
const isCreateLoading = ref(false);

// 搜索数据
const searchData = ref<FormData>({});

// 表格数据
const tables = ref<TableData[]>([]);

// 分页数据
const pagination = reactive<PaginationData>({
  total: 0,
  page: 1,
  pageSize: 20,
});

onMounted(() => {
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
  handleSearch(searchData.value);
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
    const { code, data } = await getArticlePage(query);
    if (Number(code) !== 200) return;
    const { items, total } = data;
    tables.value = items;
    pagination.total = total;
  } finally {
    isLoading.value = false;
  }
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
  * @param id
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
