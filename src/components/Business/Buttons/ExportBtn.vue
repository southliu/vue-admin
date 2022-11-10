<template>
 <Button class="mr-10px" @click="handleClick">
    <template #icon>
      <Icon
        class="text-17px"
        icon='entypo:export'
      />
    </template>
    <span>导出</span>
 </Button>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue'

const emit = defineEmits(['click'])

// 处理点击事件
const handleClick = () => {
  emit('click')
}
</script>
