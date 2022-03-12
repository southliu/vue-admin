<template>
  <Table :columns="data.columns" :data-source="data.dataSource">
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
import { Table, Tag } from 'ant-design-vue'
import type { TableProps } from 'ant-design-vue'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<TableProps>,
      required: true
    }
  },
  components: {
    Table,
    Tag
  },
  setup() {
    return {
    }
  }
})
</script>
