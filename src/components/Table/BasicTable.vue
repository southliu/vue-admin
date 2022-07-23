<template>
  <div :id="id" class="vxe_table">
    <Grid
      v-bind="gridOptions"
      :height="tableHeight"
      :loading="loading"
      :data="data.data"
      :columns="handleColumns(columns)"
    >
      <template #operate="{ row }">
        <slot name="operate" :record="row" />
      </template>
    </Grid>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { ITableData } from '@/types/global'
import type { VxeGridProps, VxeGridPropTypes } from 'vxe-table'
import { defineComponent, h, ref, reactive, onMounted, onUnmounted } from 'vue'
import { Grid } from 'vxe-table'
import { useTableHeight } from './hooks/useTableHeight'
import { useDebounceFn } from '@vueuse/core'
import { EMPTY_VALUE } from '@/utils/config'

export default defineComponent({
  name: 'BasicTable',
  props: {
    id: {
      type: String,
      required: false,
      default: 'table'
    },
    data: {
      type: Object as PropType<ITableData>,
      required: true
    },
    columns: {
      type: Array as PropType<VxeGridPropTypes.Columns>,
      required: true
    },
    options: {
      type: Object as PropType<VxeGridProps>,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    // 高度偏移差
    offsetHeight: {
      type: Number,
      required: false,
      default: 0
    },
    // 是否开启监听窗口变化而更改高度
    isResize: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components: {
    Grid
  },
  setup (props) {
    const tableHeight = ref(0)

    onMounted(() => {
      getTableHeight()
      if (props.isResize) {
        startResize()
      }
    })

    onUnmounted(() => {
      if (props.isResize) {
        stopResize()
      }
    })

    // 表格参数
    const gridOptions = reactive<VxeGridProps>({
      border: true, // 边框
      showOverflow: true, // 内容过长时显示为省略号
      showHeaderOverflow: true, // 表头所有内容过长时显示为省略号
      autoResize: true, // 自动监听父元素的变化去重新计算表格
      stripe: true, // 斑马纹
      size: 'small', // 表格尺寸
      rowConfig: {
        useKey: true, // 是否需要为每一行的 VNode 设置 key 属性
        isHover: true, // 当鼠标移到行时，是否要高亮当前行
        isCurrent: true // 当鼠标点击行时，是否要高亮当前行
      },
      sortConfig: {
        trigger: 'cell'
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
      ...props.options
    })

    /**
     * 处理表格数据，为空显示'-'
     * @param array - 表格列值
     */
    const handleColumns = (array?: VxeGridPropTypes.Columns) => {
      if (!array) return undefined

      for (let i = 0; i < array.length; i++) {
        const element = array[i]
        // 初始化最小宽度70
        element.minWidth = element.minWidth || 50

        // 如果表格存在默认值设置，则跳过当前循环
        if (element.slots && Object.keys(element.slots).length > 0) continue

        // 为每项添加default插槽
        if (!element.slots) element.slots = {}
        element.slots = {
          default: ({ row }) => [
            h('span', {
              innerHTML: row?.[element.field as string] || EMPTY_VALUE
            })
          ]
        }
      }

      return array
    }

    /** 获取表格高度 */
    const getTableHeight = () => {
      tableHeight.value = useTableHeight(props.id, props.offsetHeight)
    }

    // 滚动事件防抖
    const handler = () => getTableHeight()
    const handleSize = useDebounceFn(handler, 200)
  
    /** 开始监听滚动事件 */
    const startResize = () => {
      window.addEventListener('resize', handleSize)
    }

    /** 结束监听滚动事件 */
    const stopResize = () => {
      window.removeEventListener('resize', handleSize)
    }

    return {
      tableHeight,
      gridOptions,
      handleColumns
    }
  }
})
</script>
