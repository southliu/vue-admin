<template>
  <div class="pt-50px pb-30px pl-20px w-full overflow-hidden">
    <div v-for="(item, index) in renders" :key="index">
      <div :style="mainStyle">{{ item.label }}</div>
      <div :style="gridStyle">今天</div>
      <div :style="gridStyle">{{ item.value?.day || '-' }}</div>
      <div :style="gridStyle">本周</div>
      <div :style="gridStyle">{{ item.value?.week || '-' }}</div>
      <div :style="gridStyle">本月</div>
      <div :style="gridStyle">{{ item.value?.moth || '-' }}</div>
      <div :style="gridStyle">昨天</div>
      <div :style="gridStyle">{{ item.value?.yesterday || '-' }}</div>
      <div :style="gridStyle">上周</div>
      <div :style="gridStyle">{{ item.value?.lastweek || '-' }}</div>
      <div :style="gridStyle">上月</div>
      <div :style="gridStyle">{{ item.value?.last_moth || '-' }}</div>
      <div :style="gridStyle">本年总{{ item.label }}</div>
      <div :style="countStyle">{{ item.value?.year || '-' }}</div>
      <div :style="gridStyle">去年总{{ item.label }}</div>
      <div :style="countStyle">{{ item.value?.last_year || '-'}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType, StyleValue } from 'vue'
import { defineComponent, watch, ref } from 'vue'

interface IChildrenData {
  day: number;
  last_moth: number;
  last_year: number;
  lastweek: number;
  moth: number;
  week: number;
  year: number;
  yesterday: number;
}

interface IPropsData {
  pay: Partial<IChildrenData>;
  reg: Partial<IChildrenData>;
  cost: Partial<IChildrenData>;
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IPropsData>,
      required: true
    }
  },
  setup(props) {
    const { data } = props
    const { cost, pay, reg } = data
    const renders = ref([
      { label: '收入', value: pay || [] },
      { label: '注册', value: reg || [] },
      { label: '支出', value: cost || [] },
    ])

    watch(() => props.data, value => {
      const { cost, pay, reg } = value
      renders.value = [
        { label: '收入', value: pay || [] },
        { label: '注册', value: reg || [] },
        { label: '支出', value: cost || [] },
      ]
    })

    // 样式
    const gridStyle: StyleValue = {
      width: '13%',
      float: 'left',
      textAlign: 'center',
      height: '30px',
      lineHeight: '30px',
      border: '1px solid #ececec'
    }
    const countStyle: StyleValue = {
      width: '26%',
      float: 'left',
      textAlign: 'center',
      height: '30px',
      lineHeight: '30px',
      border: '1px solid #ececec'
    }
    const mainStyle: StyleValue = {
      width: '13%',
      float: 'left',
      textAlign: 'center',
      height: '90px',
      lineHeight: '90px',
      border: '1px solid #ececec'
    }

    return {
      gridStyle,
      countStyle,
      mainStyle,
      renders
    }
  },
})
</script>
