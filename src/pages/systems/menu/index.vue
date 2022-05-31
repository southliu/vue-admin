<template>
  <BasicContent>
    <template #top>
      <BasicSearch
        :list="searches.list"
        :data="searches.data"
        :loading="loading"
        :is-search="true"
        :is-create="true"
        @onCreate="onCreate"
        @handleFinish="handleSearch"
      />
    </template>

    <BasicTable :data="tables" :loading="loading">
      <template v-slot:operate='row'>
        <!-- <UpdateBtn
          class="mr-2"
          @click="onUpdate(row.record)"
        /> -->
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
    @handleCancel="onCreate"
  >
    <BasicForm
      ref="createFormRef"
      :list="creates.list"
      :label-col="{ span: 7 }"
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
import { getMenuPage, createMenu, updateMenu, deleteMenu } from '@/servers/systems/menu'
import { useLoading } from '@/hooks'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import { MENU_MODULE, MENU_STATUS, MENU_ACTIONS } from '@/utils/constants'
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
    const { loading, startLoading, endLoading } = useLoading()

    // 搜索数据
    const searches = reactive<ISearchData>({
      data: {},
      list: [
        {
          title: '状态',
          key: 'status',
          component: 'Select',
          componentProps: {
            options: MENU_STATUS
          }
        },
        {
          title: '模块',
          key: 'module',
          wrapperCol: 170,
          component: 'Select',
          componentProps: {
            options: MENU_MODULE
          }
        },
        {
          title: '控制器',
          key: 'controller',
          component: 'Input'
        }
      ]
    })

    // 新增数据
    const creates = reactive<ICreateData>({
      id: '',
      isVisible: false,
      title: '新增',
      data: {
        status: 1,
        module: 'authority'
      },
      list: [
        {
          title: '名称',
          key: 'name',
          component: 'Input'
        },
        {
          title: '状态',
          key: 'status',
          component: 'Select',
          componentProps: {
            options: MENU_STATUS
          }
        },
        {
          title: '模块',
          key: 'module',
          component: 'Select',
          componentProps: {
            options: MENU_MODULE
          }
        },
        {
          title: '控制器',
          key: 'controller',
          component: 'Input'
        },
        {
          title: '动作',
          key: 'action',
          component: 'Input'
        },
        {
          title: '需要同时创建的菜单',
          key: 'actions',
          component: 'CheckboxGroup',
          componentProps: {
            options: MENU_ACTIONS
          }
        },
      ]
    })
    
    // 表格数据
    const tables = reactive<ITableData>({
      total: 0,
      data: [],
      columns: [
        {
          title: 'ID',
          field: 'id'
        },
        {
          title: '名称',
          field: 'name'
        },
        {
          title: '状态',
          field: 'status'
        },
        {
          title: '模块',
          field: 'module'
        },
        {
          title: '控制器',
          field: 'controller'
        },
        {
          title: '动作',
          field: 'action'
        },
        {
          title: '创建时间',
          field: 'created_at',
          minWidth: 140
        },
        {
          title: '更新时间',
          field: 'updated_at',
          minWidth: 140
        },
        {
          title: '操作',
          field: 'operate',
          minWidth: 160,
          slots: { default: 'operate' }
        },
      ]
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
      startLoading()
      const query = { ...pagination, ...searches.data }
      const { data: { data } } = await getMenuPage(query)
      const { items, total } = data
      tables.data = items
      tables.total = total
      endLoading()
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
      startLoading()
      searches.data = values
      const query = { ...pagination, ...values }
      const { data: { data } } = await getMenuPage(query)
      const { items, total } = data
      tables.data = items
      tables.total = total
      endLoading()
    }

    /** 点击新增 */
    const onCreate = () => {
      creates.isVisible = !creates.isVisible
      creates.title = '新增'
      creates.id = ''
    }

    /**
     * 点击编辑
     * @param record - 当前行数据
     */
    const onUpdate = (record: IFormData) => {
      const { id, name } = record
      creates.isVisible = !creates.isVisible
      creates.id = id as string
      creates.title = `编辑(${ name as string })`
      creates.data = record
    }

    /**
     * 新增/编辑提交
     * @param values - 表单返回数据
     */
    const handleCreate = async (values: IFormData) => {
      startLoading()
      const functions = () => creates.id ? updateMenu(creates.id, values) :  createMenu(values)
      const { data } = await functions()
      if (data?.code === 200) {
        getPage()
        creates.isVisible = false
        message.success(data?.message || '操作成功')
      }
      endLoading()
    }

    /**
     * 删除
     * @param id
     */
    const handleDelete = async (id: string | number) => {
      startLoading()
      const { data } = await deleteMenu(id as string)
      if (data?.code === 200) {
        message.success(data?.message || '删除成功')
        getPage()
      }
      endLoading()
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
      createFormRef,
      searches,
      creates,
      tables,
      pagination,
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
