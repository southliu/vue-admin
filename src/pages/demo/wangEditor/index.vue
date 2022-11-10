<template>
  <div class="p-2">
    <WangEditor
      v-model="editorValue"
      :height="500"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTitle } from '@/hooks/useTitle'
import WangEditor from '@/components/WangEditor/index.vue'

useTitle('富文本')
const editorValue = ref('')
</script>
