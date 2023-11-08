<template>
  <Button
    :loading="isLoading"
    @click="onClick"
  >
    <template #icon>
      <Icon icon="ant-design:copy-outlined" />
    </template>
    {{ text }}
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Icon } from '@iconify/vue';

interface DefineProps {
  isLoading?: boolean;
  text?: string;
  value: string;
}

const props = withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
});

/** 点击编辑 */
const onClick = () => {
  useCopyToClipboard(props.value);
};
</script>
