<template>
  <BasicContent v-if="pagePermission.page">
    <template #top>
      <BasicSearch
        :list="searchList"
        :data="searches.data"
        :isLoading="isLoading"
        :isCreate="pagePermission.create"
        @onCreate="onCreate"
        @handleFinish="handleSearch"
      />
    </template>

    <BasicTable
      :data="tables"
      :columns="tableColumns"
      :isLoading="isLoading"
    >
      <template v-slot:operate='row'>
        <UpdateBtn
          v-if="pagePermission.update"
          class="mr-2"
          :isLoading="isCreateLoading"
          @click="onUpdate(row.record)"
        />
        <DeleteBtn
          v-if="pagePermission.delete"
          :isLoading="isLoading"
          @click="handleDelete(row.record.id)"
        />
      </template>
    </BasicTable>

    <template #footer>
      <BasicPagination
        :page="pagination.page"
        :pageSize="pagination.pageSize"
        :total="tables.total"
        :isLoading="isLoading"
        @handleChange="handlePagination"
      />
    </template>
  </BasicContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentArticle'
})
</script>

<script lang="ts" setup>
import type { IFormData } from '#/form'
import type { ISearchData, ITableData, IPaginationData } from '#/public'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useTitle } from '@/hooks/useTitle'
import { onActivated, onMounted, reactive, ref } from 'vue'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import { searchList, tableColumns } from './model'
import { checkPermission } from '@/utils/permissions'
import { usePublicStore } from '@/stores/public'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { getArticlePage, deleteArticle } from '@/servers/content/article'
import BasicContent from '@/components/Content/BasicContent.vue'
import BasicTable from '@/components/Table/BasicTable.vue'
import BasicPagination from '@/components/Pagination/BasicPagination.vue'
import BasicSearch from '@/components/Search/BasicSearch.vue'

useTitle('文章管理')
const router = useRouter()
const userStore = useUserStore()
const publicStore = usePublicStore()
const { setRefreshPage } = publicStore
const { permissions } = storeToRefs(userStore)
const { isRefreshPage } = storeToRefs(publicStore)
const isLoading = ref(false)
const isCreateLoading = ref(false)

// 权限前缀
const permissionPrefix = '/content/article'

// 权限
const pagePermission = reactive({
  page: checkPermission(`${permissionPrefix}/index`, permissions.value),
  create: checkPermission(`${permissionPrefix}/create`, permissions.value),
  update: checkPermission(`${permissionPrefix}/update`, permissions.value),
  delete: checkPermission(`${permissionPrefix}/delete`, permissions.value)
})

// 搜索数据
const searches = reactive<ISearchData>({
  data: {}
})

// 表格数据
const tables = reactive<ITableData>({
  total: 0,
  data: []
})

// 分页数据
const pagination = reactive<IPaginationData>({
  page: 1,
  pageSize: 20,
})

onMounted(() => {
  if (!isRefreshPage.value) {
    getPage()
  }
})

onActivated(() => {
  if (isRefreshPage.value) {
    getPage()
    setRefreshPage(false)
  }
})

/** 获取表格数据 */
const getPage = async () => {
  handleSearch(searches.data)
}

/**
  * 搜索提交
  * @param values - 表单返回数据
  */
const handleSearch = async (values: IFormData) => {
  searches.data = values
  const query = { ...pagination, ...values }
  try {
    isLoading.value = true
    const { data: { data } } = await getArticlePage(query)
    const { items, total } = data
    tables.data = items
    tables.total = total
  } finally {
    isLoading.value = false
  }
}

/** 点击新增 */
const onCreate = () => {
  router.push('/content/article/option?type=create')
}

/**
  * 点击编辑
  * @param record - 当前行数据
  */
const onUpdate = async (record: IFormData) => {
  const { id } = record
  router.push(`/content/article/option?type=update&id=${id as string}`)
}

/**
  * 删除
  * @param id
  */
const handleDelete = async (id: string | number) => {
  try {
    isLoading.value = true
    const { data } = await deleteArticle(id as string)
    if (data?.code === 200) {
      message.success(data?.message || '删除成功')
      getPage()
    }
  } finally {
    isLoading.value = false
  }
}

/**
  * 分页
  * @param page - 当前页
  * @param pageSize - 分页总数
  */
const handlePagination = (page: number, pageSize: number) => {
  pagination.page = page
  pagination.pageSize = pageSize
  getPage()
}
</script>
