<template>
  <div class="p-2">
    <WangEditor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WangEditor from '@/components/WangEditor/index.vue'

export default defineComponent({
  name: 'DemoWangEditor',
  components: {
    WangEditor
  },
  setup() {
    
  },
})
</script>
