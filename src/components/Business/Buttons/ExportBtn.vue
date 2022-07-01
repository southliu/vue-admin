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

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'ExportBtn',
  emits: ['click'],
  components: {
    Button
  },
  setup(props, { emit }) {
    // 处理点击事件
    const handleClick = () => {
      emit('click')
    }

    return {
      handleClick
    }
  }
})
</script>
