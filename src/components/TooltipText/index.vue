<template>
  <Tooltip
    v-if="showTooltipText"
  >
    <template #title>
      <span>{{ showTooltipText }}</span>
    </template>
    <span>{{ text }}</span>
  </Tooltip>

  <span v-else>{{ text }}</span>
</template>

<script lang="ts" setup>
/**
 * 提示文本组件
 */
import { onMounted, ref, watch } from 'vue';
import { Tooltip } from 'ant-design-vue';

defineOptions({
  name: 'TooltipText'
});

interface DefineProps {
  text: string; // 默认显示文本
  tooltipText: string | string[]; // 提示文本
}

const props = withDefaults(defineProps<DefineProps>(), {});

const showTooltipText = ref('');

onMounted(() => {
  handleInit();
});

watch(() => props.tooltipText, () => {
  handleInit();
});

/** 初始化 */
const handleInit = () => {
  // 如果提示文本为数组
  if (Array.isArray(props.tooltipText)) {
    showTooltipText.value = props.tooltipText.join('/');
    return;
  }
  showTooltipText.value = props.tooltipText || '';
};
</script>