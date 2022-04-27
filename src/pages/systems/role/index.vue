<template>
  <BasicContent>
    <template #top>
      <BasicSearch
        :list="searches.list"
        :data="searches.data"
        :is-search="true"
        :is-create="true"
        @onCreate="onCreate"
        @handleFinish="handleSearch"
      />
    </template>

    <BasicTable :data="tables" :loading="loading">
      <template v-slot:operate='row'>
        <UpdateBtn
          class="mr-2"
          @click="onUpdate(row.record)"
        />
        <DeleteBtn
          @click="handleDelete(row.record.age)"
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
      :data="creates.data"
      @handleFinish="handleCreate"
    />
  </BasicModal>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, h, onMounted, reactive, ref } from 'vue'
import { getSystemUserPage } from '@/servers/systems/user'
import { useLoading } from '@/hooks'
import type { IFormData } from '@/types/form'
import type { IBasicForm } from '@/components/Form/model'
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
          title: '年龄',
          key: 'age',
          component: 'InputNumber'
        },
        {
          title: '名字',
          key: 'name',
          component: 'Input'
        }
      ]
    })

    // 新增数据
    const creates = reactive<ICreateData>({
      isVisible: false,
      title: '新增',
      data: {
        username: '',
      },
      list: [
        {
          title: '用户名',
          key: 'username',
          component: 'Input'
        }
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
          title: '用户名',
          field: 'username'
        },
        {
          title: '姓名',
          field: 'real_name'
        },
        {
          title: '角色',
          field: 'roles_name'
        },
        {
          title: '手机号',
          field: 'phone'
        },
        {
          title: '邮箱',
          field: 'email'
        },
        {
          title: '状态',
          field: 'status',
          slots: {
            default: ({ row }) => [
              h('span', { innerHTML: row.status ? '开启' : '关闭' })
            ]
          }
        },
        {
          title: '操作',
          field: 'operate',
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
      const { data: { data } } = await getSystemUserPage(query)
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
      console.log('values:', values)
      startLoading()
      searches.data = values
      const query = { ...pagination, ...values }
      const { data: { data } } = await getSystemUserPage(query)
      const { items, total } = data
      tables.data = items
      tables.total = total
      endLoading()
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
      creates.isVisible = !creates.isVisible
      creates.title = '编辑'
      creates.data = record
    }

    /**
     * 新增/编辑提交
     * @param values - 表单返回数据
     */
    const handleCreate = (values: IFormData) => {
      console.log('handleCreate:', values)
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
