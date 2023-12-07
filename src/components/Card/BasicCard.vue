<template>
  <div
    :class="{
      'p-5': isPadding,
      'mb-10px': isMarginBottom,
      'theme-bg rounded-2': isBg
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface DefineProps {
  isPadding?: boolean; // 是否需要填充
  isBg?: boolean; // 是否需要背景色
  isMarginBottom?: boolean; // 是否需要下间距
}

withDefaults(defineProps<DefineProps>(), {
  isPadding: true,
  isBg: true,
  isMarginBottom: false
});
</script>