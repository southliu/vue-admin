<template>
  <div id="content" class="h-full bg px-2 py-4 box-border ">
    <div class="h-full relative">
      <div class="h-full bg-white pt-6 px-5 pb-40px overflow-y-auto">
        <slot></slot>
      </div>

      <div class="
        pagination
        w-full
        absolute
        bottom-0
        flex
        items-center
        justify-end
        bg-white
        px-5
        h-40px
        z-1000"
      >
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.bg {
  background-color: @bg;
}
</style>
