<template>
  <Pagination
    showSizeChanger
    showQuickJumper
    size="small"
    :defaultCurrent="defaultCurrent"
    :total="total"
    :onChange="onChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Pagination } from 'ant-design-vue'

export default defineComponent({
  props: {
    total: {
      type: Number,
      required: true
    },
    defaultCurrent: {
      type: Number,
      default: 1
    }
  },
  components: {
    Pagination 
  },
  setup(props, context) {
    // 页数改变
    const onChange = (page: number, pageSize: number) => {
      context.emit('handleChange', page, pageSize)
    }

    return {
      onChange
    }
  }
})
</script>
