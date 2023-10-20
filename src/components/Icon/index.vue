<template>
  <Icon>
    <template #component>
      <i
        v-bind="attrs"
        :class="`iconify ${attrs.class}`"
        :data-icon="icon"
      />
      </template>
  </Icon>
</template>

<script lang="ts" setup>
import { watch, useAttrs } from 'vue';
import { getIcon } from '@iconify/iconify';
import Icon from '@ant-design/icons-vue';

/**
 * 图标组件
 */
defineOptions({
  name: 'IconBtn'
});

const props = defineProps({
  icon: {
    type: String,
    required: true
  }
});

const attrs = useAttrs();

watch(() => props.icon, () => {
  getIcon(props.icon);
});
</script>
