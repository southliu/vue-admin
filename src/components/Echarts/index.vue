<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue'
  import type { ECBasicOption } from 'echarts/types/dist/shared'
  import { onMounted, watch, ref } from 'vue'
  import echarts from './lib/echarts'

  const props = defineProps({
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
  })

  const chartRef = ref<HTMLDivElement | null>(null)

  onMounted(() => {
    // 初始化chart
    const chartInstance = echarts.init(chartRef.value as HTMLDivElement)
    chartInstance.setOption(props.option)
  })

  watch(() => props.option, value => {
    if (value) {
      // 摧毁echarts后在初始化
      if (chartRef.value && echarts !== null && echarts !== undefined) {
        echarts?.dispose(chartRef.value)
      }
      // 初始化chart
      const chartInstance = echarts.init(chartRef.value as HTMLDivElement)
      chartInstance.setOption(value)
    }
  })
</script>
