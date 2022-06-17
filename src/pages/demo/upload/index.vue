<template>
  <button @click="toggle">测试</button>
  <Test
    v-if="visible"
    :visible="visible"
    @toggle="toggle"
  />
</template>

<script lang="ts">
import { createAsyncComponent } from '@/utils/createAsyncComponent'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Test: createAsyncComponent(() => (
      import('./components/Test.vue')
    ))
  },
  setup() {
    const visible = ref(false)

    const toggle = () => {
      visible.value = !visible.value
    }

    return {
      visible,
      toggle
    }
  },
})
</script>
