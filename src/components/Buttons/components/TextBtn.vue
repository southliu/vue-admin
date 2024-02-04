<template>
  <Spin
    v-if="isLoading"
    :spinning="isLoading"
    wrapperClassName="inline-block"
  />
  <span
    v-bind="attrs"
    v-else
    :type="type"
    :danger="danger"
    :class="`click-text ${attrs.class}`"
    @click="onClick"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import type { ButtonProps } from 'ant-design-vue/lib/button';
import { useAttrs } from 'vue';
import { Spin } from 'ant-design-vue';

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
