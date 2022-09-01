<template>
  <div>
    <InputSearch
      v-model:value="value"
      placeholder="请输入"
      enterButton="复制"
      @search="handleCopy"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { InputSearch, message } from 'ant-design-vue'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

const value = ref('')

/**
 * 处理复制
 * @param value - 复制内容
 */
const handleCopy = (value: string) => {
  if (!value) return message.warning({ content: '请输入复制内容', key: 'copy' })
  useCopyToClipboard(value)
}
</script>
