<template>
  <Grid
    v-bind="gridOptions"
    :loading="loading"
    :data="data.data"
    :columns="handleColumns(data?.columns)"
  >
    <template #operate="{ row }">
      <slot name="operate" :record="row" />
    </template>
  </Grid>
</template>

<script lang="ts">
import { defineComponent, h, reactive } from 'vue'
import { Grid } from 'vxe-table'
import type { PropType } from 'vue'
import type { VxeGridPropTypes } from 'vxe-table'
import 'vxe-table/es/table/style.css'
import 'vxe-table/es/header/style.css'
import { useTableHeight } from '@/hooks'
// import 'vxe-table/lib/header/style/style.min.css'


export default defineComponent({
  name: 'BasicTable',
  props: {
    data: {
      type: Object as PropType<ITableData>,
      required: true
    },
    loading: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    Grid
  },
  setup (props) {
    console.log('window.innerHeight:', window.innerHeight)
    // 表格参数
    const gridOptions = reactive<ITableData>({
      maxHeight: useTableHeight(), // 最大高度
      border: true, // 边框
      showOverflow: true, // 内容过长时显示为省略号
      showHeaderOverflow: true, // 表头所有内容过长时显示为省略号
      autoResize: true, // 自动监听父元素的变化去重新计算表格
      stripe: true, // 斑马纹
      rowConfig: {
        useKey: true, // 是否需要为每一行的 VNode 设置 key 属性
        isHover: true, // 当鼠标移到行时，是否要高亮当前行
        isCurrent: true // 当鼠标点击行时，是否要高亮当前行
      },
      columnConfig: {
        resizable: true // 每一列是否启用列宽调整
      },
      scrollX: {
        enabled: true // 横向虚拟滚动配置
      },
      scrollY: {
        enabled: true // 纵向虚拟滚动配置
      },
      ...props.data
    })

    /**
     * 处理表格数据，为空显示'-'
     * @param array - 表格列值
     */
    const handleColumns = (array?: VxeGridPropTypes.Columns) => {
      if (!array) return undefined

      for (let i = 0; i < array.length; i++) {
        const element = array[i]

        // 如果表格存在默认值设置，则跳过当前循环
        if (element.slots?.default) continue

        // 为每项添加default插槽
        if (!element.slots) element.slots = {}
        element.slots = {
          default: ({ row }) => [
            h('span', {
              innerHTML: row?.[element.field as string] || import.meta.env.VITE_TABLE_EMPTY_VALUE
            })
          ]
        }
      }

      return array
    }

    return {
      gridOptions,
      handleColumns
    }
  }
})
</script>
