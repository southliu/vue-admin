<template>
  <Button class="mr-10px" @click="handleClick">
    <div class="flex items-center">
      <Icon
        class="mr-5px mb-1px"
        icon='entypo:export'
      />
      <span>导出</span>
    </div>
  </Button>
</template>
 
<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import { Icon } from '@iconify/vue';
 
interface DefineEmits {
  (e: 'click'): void;
}

const emit = defineEmits<DefineEmits>();
 
 // 处理点击事件
 const handleClick = () => {
   emit('click');
 };
 </script>
 