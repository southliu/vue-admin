<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
import { PropType, watch } from 'vue'
import type { ECBasicOption } from 'echarts/types/dist/shared'
import { defineComponent, onMounted, ref } from 'vue'
import echarts from './lib/echarts'

export default defineComponent({
  name: 'EchartsLine',
  props: {
    width: {
      type: String as PropType<string>,
      default: '100%',
      required: true
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(100vh - 78px)',
      required: true
    },
    option: {
      type: Object as PropType<ECBasicOption>,
      required: true
    }
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      // 初始化chart
      const chartInstance = echarts.init(chartRef.value as HTMLDivElement)
      chartInstance.setOption(props.option)
    })

    watch(() => props.option, value => {
      if (value) {
        // 摧毁echarts后在初始化
        if (chartRef.value && echarts !== null && echarts != undefined) {
          echarts?.dispose(chartRef.value)
        }
        // 初始化chart
        const chartInstance = echarts.init(chartRef.value as HTMLDivElement)
        chartInstance.setOption(value)
      }
    })
    
    return {
      chartRef
    }
  }
})
</script>
