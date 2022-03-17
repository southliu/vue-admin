<template>
  <Pagination
    showSizeChanger
    showQuickJumper
    size="small"
    :show-total="() => showTotal(total)"
    :defaultCurrent="defaultCurrent"
    :total="total"
    :onChange="onChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Pagination } from 'ant-design-vue'

export default defineComponent({
  name: 'BasicPagination',
  emits: ['handleChange'],
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
    /**
     * 显示总数
     * @param total - 总数
     */
    const showTotal = (total: number): string => {
      return `共 ${total} 条数据`
    }

    /**
     * 页数改变
     * @param page - 当前页
     * @param pageSize - 页总数
     */
    const onChange = (page: number, pageSize: number) => {
      context.emit('handleChange', page, pageSize)
    }

    return {
      showTotal,
      onChange
    }
  }
})
</script>

<style lang="less">
.ant-pagination-item {
  background-color: #f4f4f5 !important;
  margin-right: 7px !important;
}

.ant-pagination-item-active {
  background-color: #0960bd!important;
}

.ant-pagination-item-active a {
  color: #fff !important;
}

.ant-pagination-prev {
  margin-right: 7px !important;
  background-color: #f4f4f5 !important;
}

.ant-pagination-next {
  margin-right: 7px !important;
  background-color: #f4f4f5 !important;
}
</style>