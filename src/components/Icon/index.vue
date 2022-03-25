<template>
  <div class="inline-block">
    <i class="iconify" :data-icon="icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
})
</script>
