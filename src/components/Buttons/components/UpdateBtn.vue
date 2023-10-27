<template>
  <Button
    type="primary"
    :loading="isLoading"
    v-bind="attrs"
    :class="`btn ${attrs.class}`"
    @click="onClick"
  >
    编辑
  </Button>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
import { Button } from 'ant-design-vue';

interface DefineEmits {
  (e: 'click'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isLoading?: boolean;
}

withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
});

const attrs = useAttrs();

/** 点击编辑 */
const onClick = () => {
  emit('click');
};
</script>
