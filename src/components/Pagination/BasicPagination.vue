<template>
  <div
    class="
      pagination
      w-full
      flex
      items-center
      justify-end
      bg-white
      px-5
      min-h-40px
      z-999
    "
  >
    <Pagination
      showSizeChanger
      showQuickJumper
      size="small"
      :disabled="loading"
      :showTotal="() => showTotal(total)"
      :defaultCurrent="page"
      :defaultPageSize="pageSize"
      :total="total"
      :onChange="onChange"
    />
  </div>
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
      required: false,
      default: 0
    },
    page: {
      type: Number,
      required: true,
      default: 1
    },
    pageSize: {
      type: Number,
      required: true,
      default: 20
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
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
      return `共 ${total || 0} 条数据`
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