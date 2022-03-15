<template>
  <BasicContent>
    123
<Icon icon="eva:people-outline"> </Icon>
    <BasicForm
      type="search"
      class="mb-20px"
      :list="searches.list"
      :data="searches.data"
      :is-search="true"
      :is-create="true"
      @onCreate="onCreate"
      @handleFinish="handleSearch"
    />

    <BasicTable :data="tables">
      <template v-slot:operate='row'>
        <Button class="mr-2" @click="onUpdate(row.record)">
          编辑
        </Button>
        <DeleteBtn
          @handleDelete="handleDelete(row.record.age)"
        />
      </template>
    </BasicTable>

    <BasicPagination
      :total="tables.total"
      @handleChange="handlePagination"
    />
  </BasicContent>

  <BasicModal
    v-model:visible="creates.isVisible"
    :title="creates.title"
    :handle-finish="createSubmit"
    :handle-cancel="onCreate"
  >
    <BasicForm
      ref="createFormRef"
      type="create"
      :list="creates.list"
      :data="creates.data"
      @handleFinish="handleCreate"
    />
  </BasicModal>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, onActivated, onMounted, reactive, ref } from 'vue'
import { Button } from 'ant-design-vue'
import BasicContent from '@/components/BasicContent.vue'
import BasicTable from '@/components/BasicTable.vue'
import BasicPagination from '@/components/BasicPagination.vue'
import BasicForm from '@/components/BasicForm.vue'
import BasicModal from '@/components/BasicModal.vue'
import DeleteBtn from '@/components/DeleteBtn.vue'
import type { IBasicForm } from '@/components/BasicForm.vue'
import type { IFormData } from '@/types/form'
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    BasicContent,
    BasicTable,
    BasicPagination,
    BasicForm,
    BasicModal,
    DeleteBtn,
    Button
  },
  setup() {
    const createFormRef = ref<IBasicForm>()

    // 搜索数据
    const searches = reactive<ISearchData>({
      data: {
        age: 0,
        name: ''
      },
      list: [
        { title: '年龄', key: 'age', component: 'InputNumber' },
        { title: '名字', key: 'name', component: 'Input' }
      ]
    })

    // 新增数据
    const creates = reactive<ICreateData>({
      isVisible: false,
      title: '新增',
      data: {
        age: 0,
        address: '',
        tags: []
      },
      list: [
        { title: '年龄', key: 'age', component: 'InputNumber' },
        { title: '地址', key: 'address', component: 'Input' },
        { title: '类型', key: 'type', component: 'Select',
          componentProps: {
            options: [
              { label: '123', value: '123' },
              { label: '456', value: '456' },
            ]
          }
        }
      ]
    })
    
    // 表格数据
    const tables = reactive<ITableData>({
      total: 50,
      columns: [
        {
          title: '年龄',
          field: 'age',
        },
        {
          title: '地址',
          field: 'address',
        },
        {
          title: '标签',
          field: 'tags',
        },
        {
          title: '操作',
          field: 'operate',
          slots: { default: 'operate' }
        },
      ],
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'].join(''),
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'].join(''),
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'].join(''),
        },
      ]
    })

    onActivated(() => {
      console.log('activated')
    })

    onMounted(() => {
      console.log('onMounted')
    })

    // 表格提交
    const createSubmit = () => {
      createFormRef.value?.handleSubmit()
    }

    // 搜索提交
    const handleSearch = (values: IFormData) => {
      console.log('handleSearch:', values)
    }

    // 点击新增
    const onCreate = () => {
      creates.isVisible = !creates.isVisible
    }

    // 点击编辑
    const onUpdate = (record: IFormData) => {
      creates.isVisible = !creates.isVisible
      creates.data = record
    }

    // 新增/编辑提交
    const handleCreate = (values: IFormData) => {
      console.log('handleCreate:', values)
    }

    // 删除
    const handleDelete = (id: string | number) => {
      console.log('handleDelete:', id)
    }

    // 分页
    const handlePagination = (page: number, pageSize: number) => {
      console.log(page, pageSize)
    }

    return {
      createFormRef,
      searches,
      creates,
      tables,
      Icon,
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
