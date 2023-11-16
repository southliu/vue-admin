<template>
  <div class='
    bg-white
    absolute
    flex
    justify-end
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
      danger
      class="mr-10px"
      @click="goBack"
    >
      返回
    </Button>
    <Button
      type="primary"
      @click="handleSubmit"
    >
      提交
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