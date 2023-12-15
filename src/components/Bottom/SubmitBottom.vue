<template>
  <div class='
    submit-bottom
    theme-bg
    bg-white
    absolute
    flex
    left-0
    right-0
    bottom-0
    py-5px
    px-30px
    box-border
    b-t
    b-#ececec
    rounded-b-2
    z-999
  '>
    <Button
      type="primary"
      class="mr-10px"
      @click="handleSubmit"
    >
      提交
    </Button>
    <Button
      danger
      @click="goBack"
    >
      返回
    </Button>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue';

interface DefineProps {
  isLoading?: boolean;
  goBack: () => void;
  handleSubmit: () => void;
}

withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
});
</script>

<style lang="less" scoped>
.theme-dark {
  .submit-bottom {
    border-top-color: #414141 !important;
  }
}
</style>