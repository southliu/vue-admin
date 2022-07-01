<template>
  <BasicContent>
    <template #top>
      <BasicSearch
        :list="searchList"
        :data="searches.data"
        :isSearch="true"
        :isCreate="true"
        @onCreate="onCreate"
        @handleFinish="handleSearch"
      />
    </template>

    <BasicTable
      :data="tables"
      :columns="tableColumns"
    >
     <template v-slot:operate='row'>
        <UpdateBtn
          class="mr-2"
          @click="onUpdate(row.record)"
        />
        <DeleteBtn
          @click="handleDelete(row.record.id)"
        />
      </template>
    </BasicTable>

    <template #footer>
      <BasicPagination
        :page="pagination.page"
        :pageSize="pagination.pageSize"
        :total="tables.total"
        @handleChange="handlePagination"
      />
    </template>
  </BasicContent>

  <BasicModal
    v-model:visible="creates.isVisible"
    :title="creates.title"
    @handleFinish="createSubmit"
    @handleCancel="onCloseCreate"
  >
    <BasicForm
      ref="createFormRef"
      :list="createList(creates.id)"
      :label-col="{ span: 6 }"
      :data="creates.data"
      @handleFinish="handleCreate"
    />
  </BasicModal>
</template>

<script lang="ts">
import type { IFormData } from '@/types/form'
import type { IBasicForm } from '@/components/Form/model'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getMenuPage, getMenuById, createMenu, updateMenu, deleteMenu } from '@/servers/systems/menu'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import { searchList, createList, tableColumns } from './data'
import BasicContent from '@/components/Content/BasicContent.vue'
import BasicTable from '@/components/Table/BasicTable.vue'
import BasicPagination from '@/components/Pagination/BasicPagination.vue'
import BasicSearch from '@/components/Search/BasicSearch.vue'
import BasicForm from '@/components/Form/BasicForm.vue'
import BasicModal from '@/components/Modal/BasicModal.vue'

export default defineComponent({
  name: 'SystemMenu',
  components: {
    SmileOutlined,
    DownOutlined,
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
      isVisible: false,
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
      const query = { ...pagination, ...searches.data }
      const { data: { data } } = await getMenuPage(query)
      const { items, total } = data
      tables.data = items
      tables.total = total
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
      const { data: { data } } = await getMenuPage(query)
      const { items, total } = data
      tables.data = items
      tables.total = total
    }

    /** 点击新增 */
    const onCreate = () => {
      creates.isVisible = !creates.isVisible
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
      creates.isVisible = !creates.isVisible
      creates.id = id as string
      creates.title = EDIT_TITLE(name as string)

      const { data: { data } } = await getMenuById(id as string)
      creates.data = data
    }

    /**
     * 新增/编辑提交
     * @param values - 表单返回数据
     */
    const handleCreate = async (values: IFormData) => {
      const functions = () => creates.id ? updateMenu(creates.id, values) :  createMenu(values)
      const { data } = await functions()
      if (data?.code === 200) {
        getPage()
        creates.isVisible = false
        message.success(data?.message || '操作成功')
      }
    }

    /** 关闭新增/编辑 */
    const onCloseCreate = () => {
      creates.isVisible = false
    }

    /**
     * 删除
     * @param id
     */
    const handleDelete = async (id: string | number) => {
      const { data } = await deleteMenu(id as string)
      if (data?.code === 200) {
        message.success(data?.message || '删除成功')
        getPage()
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

    return {
      createFormRef,
      searches,
      creates,
      tables,
      pagination,
      searchList,
      tableColumns,
      createList,
      onCreate,
      onUpdate,
      createSubmit,
      onCloseCreate,
      handleSearch,
      handleCreate,
      handleDelete,
      handlePagination
    }
  }
})
</script>
