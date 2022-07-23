<template>
  <Echarts
    class="mt-20px mx-auto"
    width="98%"
    height="580px"
    :option="option"
  />
</template>

<script lang="ts">
import type { ECBasicOption } from 'echarts/types/dist/shared'
import { defineComponent, ref, watch } from 'vue'
import Echarts from '@/components/Echarts/index.vue'

type ILeftData = {
  value: number;
  name: string;
}

interface IData {
  pay_money: number;
  game_name: string;
}

export default defineComponent({
  name: 'DescriptionsPie',
  components: {
    Echarts
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const option = ref<ECBasicOption>({
      shape: {
        height: 500
      },
      title: {
        text: '游戏今日充值统计',
        subtext: '按父游戏统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: []
    })

    watch(() => props.data, value => {
      const data: ILeftData[] = []
      value?.length > 0 && value.forEach((item: IData) => {
        data.push({
          value: item.pay_money,
          name: `${item.game_name}: ${item.pay_money}元`
        })
      })

      const series = {
        name: '访问来源',
        type: 'pie',
        top: 80,
        height: 500,
        data: data,
        label: {
          formatter: '{b} ({d}%)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
      
      option.value = {...option.value, series }
    })

    return {
      option
    }
  }
})
</script>
