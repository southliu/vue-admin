<template>
  <BasicContent>
    <BasicForm
      ref="searchFormRef"
      type="search"
      class="mb-20px"
      :list="searches.list"
      :data="searches.data"
      :is-search="true"
      :is-create="true"
      :on-create="onCreate"
      :handle-finish="handleSearch"
    />
    <BasicTable
      :columns="columns"
      :data="data"
    />
  </BasicContent>

  <BasicModal
    v-model:visible="creates.isVisible"
    :title="creates.title"
    :handle-finish="() => handleSubmit('create')"
    :handle-cancel="onCreate"
  >
    <BasicForm
      ref="createFormRef"
      type="create"
      :list="creates.list"
      :data="creates.data"
      :handle-finish="handleCreate"
    />
  </BasicModal>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import BasicContent from '@/components/BasicContent.vue'
import BasicTable from '@/components/BasicTable.vue'
import BasicForm from '@/components/BasicForm.vue'
import BasicModal from '@/components/BasicModal.vue'
import { Modal } from 'ant-design-vue'
import type { IBasicForm } from '@/components/BasicForm.vue'
import type { IFormData } from '@/types/form'

const columns = [
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '操作',
    key: 'action',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    BasicContent,
    BasicTable,
    BasicForm,
    BasicModal,
    Modal
  },
  setup() {
    const searchFormRef = ref<IBasicForm>()
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
        name: '',
        tags: []
      },
      list: [
        { title: '年龄', key: 'age', component: 'InputNumber' },
        { title: '名字', key: 'name', component: 'Input' },
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

    // 表格提交
    const handleSubmit = (type: 'search' | 'create') => {
      switch (type) {
        case 'search':
          searchFormRef.value?.handleSubmit()
          break
        
        case 'create':
          createFormRef.value?.handleSubmit()
          break
      }
    }

    // 搜索提交
    const handleSearch = (values: IFormData) => {
      console.log('handleSearch:', values)
    }

    // 点击新增
    const onCreate = () => {
      creates.isVisible = !creates.isVisible
    }

    // 新增提交
    const handleCreate = (values: IFormData) => {
      console.log('handleCreate:', values)
    }

    return {
      searchFormRef,
      createFormRef,
      searches,
      creates,
      columns,
      data,
      onCreate,
      handleSubmit,
      handleSearch,
      handleCreate
    }
  }
})
</script>
