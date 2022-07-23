<template>
  <BasicContent>
    <template #top>
      <BasicSearch
        :list="searchList"
        :data="searches.data"
        :loading="loading"
        :isSearch="true"
        :isCreate="true"
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
          class="mr-2"
          :loading="createLoading"
          @click="onUpdate(row.record)"
        />
        <DeleteBtn
          :loading="loading"
          @click="handleDelete(row.record.age)"
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
    v-model:visible="creates.isVisible"
    :title="creates.title"
    :loading="createLoading"
    @handleFinish="createSubmit"
    @handleCancel="onCreate"
  >
    <BasicForm
      ref="createFormRef"
      :list="createList"
      :data="creates.data"
      @handleFinish="handleCreate"
    />
  </BasicModal>
</template>

<script lang="ts">
import type { IFormData } from '@/types/form'
import type { IBasicForm } from '@/components/Form/model'
import type { ICreateData, ISearchData, ITableData, IPaginationData } from '@/types/global'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getSystemUserPage } from '@/servers/systems/user'
import { searchList, createList, tableColumns } from './data'
import { useLoading } from '@/hooks/useLoading'
import { useCreateLoading } from '@/hooks/useCreateLoading'
import BasicContent from '@/components/Content/BasicContent.vue'
import BasicTable from '@/components/Table/BasicTable.vue'
import BasicPagination from '@/components/Pagination/BasicPagination.vue'
import BasicSearch from '@/components/Search/BasicSearch.vue'
import BasicForm from '@/components/Form/BasicForm.vue'
import BasicModal from '@/components/Modal/BasicModal.vue'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'

export default defineComponent({
  name: 'SystemUser',
  components: {
    BasicContent,
    BasicTable,
    BasicPagination,
    BasicSearch,
    BasicForm,
    BasicModal,
    DeleteBtn,
    UpdateBtn
  },
  setup() {
    const createFormRef = ref<IBasicForm>()
    const { loading, startLoading, endLoading } = useLoading()
    const { createLoading, startCreateLoading, endCreateLoading } = useCreateLoading()

    // 搜索数据
    const searches = reactive<ISearchData>({
      data: {}
    })

    // 新增数据
    const creates = reactive<ICreateData>({
      id: '',
      isVisible: false,
      title: '新增',
      data: {
        username: '',
      }
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
      try {
        startLoading()
        const query = { ...pagination, ...searches.data }
        const { data: { data } } = await getSystemUserPage(query)
        const { items, total } = data
        tables.data = items
        tables.total = total
        endLoading()
      } catch(err) {
        endLoading()
        console.error(err)
      }
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
      try {
        startLoading()
        searches.data = values
        const query = { ...pagination, ...values }
        const { data: { data } } = await getSystemUserPage(query)
        const { items, total } = data
        tables.data = items
        tables.total = total
        endLoading()
      } catch(err) {
        endLoading()
        console.error(err)
      }
    }

    /** 点击新增 */
    const onCreate = () => {
      creates.isVisible = !creates.isVisible
      creates.title = '新增'
    }

    /**
     * 点击编辑
     * @param record - 当前行数据
     */
    const onUpdate = (record: IFormData) => {
      startCreateLoading()
      creates.isVisible = !creates.isVisible
      creates.title = '编辑'
      creates.data = record
      endCreateLoading()
    }

    /**
     * 新增/编辑提交
     * @param values - 表单返回数据
     */
    const handleCreate = (values: IFormData) => {
      startCreateLoading()
      console.log('handleCreate:', values)
      endCreateLoading()
    }

    /**
     * 删除
     * @param id
     */
    const handleDelete = (id: string | number) => {
      console.log('handleDelete:', id)
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

    return {
      loading,
      createLoading,
      createFormRef,
      searches,
      creates,
      tables,
      pagination,
      searchList,
      createList,
      tableColumns,
      onCreate,
      onUpdate,
      createSubmit,
      handleSearch,
      handleCreate,
      handleDelete,
      handlePagination
    }
  }
})
</script>
