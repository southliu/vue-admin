<template>
  <BasicContent v-if="pagePermission.page">
    <template #top>
      <BasicSearch
        :list="searchList"
        :data="searches.data"
        :loading="loading"
        :isCreate="pagePermission.create"
        @onCreate="onCreate"
        @handleFinish="handleSearch"
      />
    </template>

    <BasicTable
      :data="tables"
      :columns="tableColumns"
      :loading="loading"
    >
      <template v-slot:operate='row'>
        <UpdateBtn
          v-if="pagePermission.update"
          class="mr-2"
          :loading="createLoading"
          @click="onUpdate(row.record)"
        />
        <DeleteBtn
          v-if="pagePermission.delete"
          :loading="loading"
          @click="handleDelete(row.record.id)"
        />
      </template>
    </BasicTable>

    <template #footer>
      <BasicPagination
        :page="pagination.page"
        :pageSize="pagination.pageSize"
        :total="tables.total"
        :loading="loading"
        @handleChange="handlePagination"
      />
    </template>
  </BasicContent>

  <BasicModal
    v-model:visible="creates.visible"
    :loading="createLoading"
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
import type { IFormData } from '#/form'
import type { IBasicForm } from '@/components/Form/model'
import type { ICreateData, ISearchData, ITableData, IPaginationData } from '#/global'
import { message } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'
import { getSystemMenuPage, getSystemMenuById, createSystemMenu, updateSystemMenu, deleteSystemMenu } from '@/servers/systems/menu'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import { searchList, createList, tableColumns } from './data'
import { useLoading } from '@/hooks/useLoading'
import { useCreateLoading } from '@/hooks/useCreateLoading'
import { checkPermission } from '@/utils/permissions'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import BasicContent from '@/components/Content/BasicContent.vue'
import BasicTable from '@/components/Table/BasicTable.vue'
import BasicPagination from '@/components/Pagination/BasicPagination.vue'
import BasicSearch from '@/components/Search/BasicSearch.vue'
import BasicForm from '@/components/Form/BasicForm.vue'
import BasicModal from '@/components/Modal/BasicModal.vue'

const createFormRef = ref<IBasicForm>()
const userStore = useUserStore()
const { permissions } = storeToRefs(userStore)
const { loading, startLoading, endLoading } = useLoading()
const { createLoading, startCreateLoading, endCreateLoading } = useCreateLoading()

// 权限前缀
const permissionPrefix = '/authority/menu'

// 权限
const pagePermission = reactive({
  page: checkPermission(`${permissionPrefix}/index`, permissions.value),
  create: checkPermission(`${permissionPrefix}/create`, permissions.value),
  update: checkPermission(`${permissionPrefix}/update`, permissions.value),
  delete: checkPermission(`${permissionPrefix}/delete`, permissions.value)
})

// 初始化新增数据
const initCreate = {
  status: 1,
  module: 'authority'
}

// 搜索数据
const searches = reactive<ISearchData>({
  data: {}
})

// 新增数据
const creates = reactive<ICreateData>({
  id: '',
  visible: false,
  title: '新增',
  data: initCreate
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
  getPage()
})

/**
 * 获取表格数据
 */
const getPage = async () => {
  handleSearch(searches.data)
}

/** 表格提交 */
const createSubmit = () => {
  createFormRef.value?.handleSubmit()
}

/**
 * 搜索提交
 * @param values - 表单返回数据
 */
const handleSearch = async (values: IFormData) => {
  searches.data = values
  const query = { ...pagination, ...values }
  try {
    startLoading()
    const { data: { data } } = await getSystemMenuPage(query)
    const { items, total } = data
    tables.data = items
    tables.total = total
  } finally {
    endLoading()
  }
}

/** 点击新增 */
const onCreate = () => {
  creates.visible = !creates.visible
  creates.title = ADD_TITLE
  creates.id = ''
  creates.data = initCreate
}

/**
 * 点击编辑
 * @param record - 当前行数据
 */
const onUpdate = async (record: IFormData) => {
  const { id, name } = record
  creates.visible = !creates.visible
  creates.id = id as string
  creates.title = EDIT_TITLE(name as string)

  try {
    startCreateLoading()
    const { data: { data } } = await getSystemMenuById(id as string)
    creates.data = data
  } finally {
    endCreateLoading()
  }
}

/**
 * 新增/编辑提交
 * @param values - 表单返回数据
 */
const handleCreate = async (values: IFormData) => {
  try {
    startCreateLoading()
    const functions = () => creates.id ? updateSystemMenu(creates.id, values) : createSystemMenu(values)
    const { data } = await functions()
    getPage()
    creates.id = ''
    creates.visible = false
    creates.data = initCreate
    createFormRef.value?.handleReset()
    message.success(data?.message || '操作成功')
  } finally {
    endCreateLoading()
  }
}

/** 关闭新增/编辑 */
const onCloseCreate = () => {
  creates.visible = false
}

/**
 * 删除
 * @param id
 */
const handleDelete = async (id: string | number) => {
  try {
    startLoading()
    const { data } = await deleteSystemMenu(id as string)
    if (data?.code === 200) {
      message.success(data?.message || '删除成功')
      getPage()
    }
  } finally {
    endLoading()
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
