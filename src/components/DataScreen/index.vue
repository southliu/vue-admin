<template>
  <Tooltip>
    <template #title>数据大屏</template>
    <div @click="goDataScreen">
      <Icon
        class="flex items-center justify-center text-lg mr-3 cursor-pointer"
        icon='ion:bar-chart-sharp'
      />
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import Icon from '@/components/Icon/index.vue';

/** 跳转数据大屏 */
const goDataScreen = () => {
  window.open('https://iamsouth.gitee.io/echarts');
};
</script>
