<template>
  <Table
    bordered
    :loading="!!data.loading"
    :rowKey="data.rowKey || 'id'"
    :columns="data.columns"
    :data-source="data.dataSource"
    :scroll="data.scroll"
    :pagination="false"
    :onChange="data.onChange"
    :onRow="data.onRow"
    :onHeaderRow="data.onHeaderRow"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <slot name="action" :record="record"></slot>
      </template>
    </template>
  </Table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Table } from 'ant-design-vue'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ITableData>,
      required: true
    }
  },
  components: {
    Table
  },
  setup() {
    return {
    }
  }
})
</script>
