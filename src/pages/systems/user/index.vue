<template>
  <BasicSearch :columns="columns" :data="data" />
  <BasicTable :columns="columns" :data="data" />
</template>
<script lang="ts">
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
  import { defineComponent } from 'vue'
  import BasicSearch from '@/components/BasicSearch.vue'
  import BasicTable from '@/components/BasicTable.vue'

  const columns = [
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Action',
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
      BasicTable
    },
    setup() {
      return {
        columns,
        data
      }
    }
  })
</script>
