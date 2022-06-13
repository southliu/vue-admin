<template>
  <div class="p-2">
    <WangEditor
      v-model="editorValue"
      :height="500"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WangEditor from '@/components/WangEditor/index.vue'

export default defineComponent({
  name: 'DemoWangEditor',
  components: {
    WangEditor
  },
  setup() {
    const editorValue = ref('')

    return {
      editorValue
    }
  },
})
</script>
