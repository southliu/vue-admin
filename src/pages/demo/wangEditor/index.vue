<template>
  <div class="p-2">
    <WangEditor
      v-model="value"
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
    const value = ref('<p>Hello World!</p>')

    return {
      value
    }
  },
})
</script>
