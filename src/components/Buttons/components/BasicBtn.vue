<template>
  <Button
    :loading="isLoading"
    v-bind="attrs"
    :type="type"
    :danger="danger"
    :class="`btn ${attrs.class}`"
    @click="onClick"
  >
    <template #icon>
      <slot name="icon" />
    </template>

    <slot />
  </Button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'ant-design-vue/lib/button';
import { useAttrs } from 'vue';
import { Button } from 'ant-design-vue';

interface DefineEmits {
  (e: 'click'): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps extends ButtonProps {
  isLoading?: boolean;
  type?: ButtonProps['type'],
  danger?: boolean;
}

withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
});

const attrs = useAttrs();

/** 处理点击事件 */
const onClick = () => {
  emit('click');
};
</script>
