<template>
  <Grid ref="xGrid" v-bind="gridOptions">
    <template #operate="{ row }">
      <slot name="operate" :record="row" />
    </template>
  </Grid>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { PropType } from 'vue'
import { Grid } from 'vxe-table'
import type { VxeGridInstance } from 'vxe-table'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ITableData>,
      required: true
    }
  },
  components: {
    Grid
  },
  setup (props) {
    const gridOptions = reactive<ITableData>({
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

    const xGrid = ref({} as VxeGridInstance)

    return {
      xGrid,
      gridOptions,
    }
  }

})
</script>
