<template>
  <BasicSearch>
    <BasicForm :list="searchLists" :data="searchData" />
  </BasicSearch>
  <BasicTable :columns="columns" :data="data" />
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive } from 'vue'
import BasicSearch from '@/components/BasicSearch.vue'
import BasicTable from '@/components/BasicTable.vue'
import BasicForm from '@/components/BasicForm.vue'
import { Input } from 'ant-design-vue'
import type { ISearchData, ISearchList } from '@/types/search'

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
    BasicSearch,
    BasicTable,
    BasicForm,
    Input
  },
  setup() {
    // 搜索列表
    const searchLists = reactive<ISearchList[]>([
      { title: '年龄', key: 'age', type: 'number' },
      { title: '名字', key: 'name', type: 'string' },
      { title: '类型', key: 'type', type: 'select', selectList: [
        { label: '123', value: '123' },
        { label: '456', value: '456' },
      ] },
    ])
    
    // 搜索数据
    const searchData = reactive<ISearchData>({
      age: 0,
      name: '',
      tags: []
    })

    const formStatues = reactive<ISearchData>({
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
