<template>
  <!-- <BasicInput :component-props="{}" /> -->
  <BasicContent>
    <BasicForm
      type="search"
      class="mb-20px"
      :list="searchLists"
      :data="searchData"
      :is-search="true"
      :is-create="true"
    />
    <BasicTable
      :columns="columns"
      :data="data"
    />
  </BasicContent>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive } from 'vue'
import BasicContent from '@/components/BasicContent.vue'
import BasicTable from '@/components/BasicTable.vue'
import BasicForm from '@/components/BasicForm.vue'
import type { IFormData, IFormList } from '@/types/form'
import BasicInput from '@/components/BasicInput.vue'

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
    BasicInput
  },
  setup() {
    // 搜索列表
    const searchLists = reactive<IFormList[]>([
      { title: '年龄', key: 'age', component: 'InputNumber' },
      { title: '名字', key: 'name', component: 'Input' },
      { title: '类型', key: 'type', component: 'Select',
        componentProps: {
          options: [
            { label: '123', value: '123' },
            { label: '456', value: '456' },
          ]
        }
      },
    ])
    
    // 搜索数据
    const searchData = reactive<IFormData>({
      age: 0,
      name: '',
      tags: []
    })

    const formStatues = reactive<IFormData>({
      age: 0,
      tabs: []
    })

    return {
      columns,
      data,
      formStatues,
      searchData,
      searchLists,
    }
  }
})
</script>
