<template>
  <Table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <Tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </Tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a>Delete</a>
          <a class="ant-dropdown-link">
            More actions
            <DownOutlined />
          </a>
        </span>
      </template>
    </template>
  </Table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Table, Tag } from 'ant-design-vue'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<any[]>,
      required: true
    },
    columns: {
      type: Array as PropType<any[]>,
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
