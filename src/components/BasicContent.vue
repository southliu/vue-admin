<template>
  <div class="h-full bg p-4">
    <div class="bg-white py-6 px-5">
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