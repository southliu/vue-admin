<template>
  <div class="bg p-4">
    <div class="bg-white pt-6 px-5">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.bg {
  background-color: @bg;
}
</style>