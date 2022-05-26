<template>
  <Echarts
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
}[]

export default defineComponent({
  name: 'Line',
  components: {
    Echarts
  },
  props: {
    hash: {
      type: Array,
      required: true
    },
    legend: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { hash, legend } = props
    const legendData = ref<string[]>([])
    const legendKeys = ref<string[]>([])
    const seriesData: ISeriesData = []
    const hours = new Array(24).fill(true).map((value, index) => index)

    watch(() => props.hash, value => {
      for (let key in value) {
        legendData.value.push(legend[key])
        legendKeys.value.push(key)
        const currentData: number[] = []

        hours.forEach((item) => {
          hash?.length > 0 &&
            hash.forEach((data: any) => {
              if (data.hour === item) {
                currentData.push(data[key] || 0);
              }
            });
        });

        seriesData.push({
          name: legend[key],
          type: 'line',
          data: currentData,
        });

        console.log('currentData:', currentData)
      }
    })


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
    return {
      option
    }
  }
})
</script>
