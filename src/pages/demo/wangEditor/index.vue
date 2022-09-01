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
import WangEditor from '@/components/WangEditor/index.vue'

const editorValue = ref('')
</script>
