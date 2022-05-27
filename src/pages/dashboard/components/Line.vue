<template>
  <Echarts
    class="mx-auto"
    width="100%"
    height="300px"
    :option="option"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { ECBasicOption } from 'echarts/types/dist/shared'
import Echarts from '@/components/Echarts/index.vue'

type ISeriesData = {
  name: string;
  type: string;
  data: number[];
}

export default defineComponent({
  name: 'Line',
  components: {
    Echarts
  },
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const legendData = ref<string[]>([])
    const legendKeys = ref<string[]>([])
    const seriesData = ref<ISeriesData[]>([])
    const hours = new Array(24).fill(true).map((value, index) => index)

    const option = ref<ECBasicOption>({
      title: {
        text: '今日数据趋势',
        left: 'center',
        top: 20,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legendData,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          // saveAsImage: {}
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: hours,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
    })

    watch(() => props.items, value => {
      const data: ISeriesData[] = []
      if (!value.legend || !value.hash) return
      for (let key in value.legend) {
        legendData.value.push(value.legend[key])
        legendKeys.value.push(key)
        const currentData: number[] = []

        hours.forEach((item) => {
          value.hash?.length > 0 &&
            value.hash.forEach((data: Record<string, number>) => {
              if (data.hour === item) {
                currentData.push(data[key] || 0);
              }
            });
        });

        data.push({
          name: value.legend[key] as string,
          type: 'line',
          data: currentData,
        });
      }
      option.value = { ...option.value, series: data }
    })

    return {
      option
    }
  }
})
</script>
