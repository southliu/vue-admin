<template>
  <span>{{ prefix }}{{ amountFormatter(num) }}</span>
</template>

<script lang="ts" setup>
import { amountFormatter } from '@/utils/helper'
import { onMounted, watch, ref, onUnmounted } from 'vue'

const props = defineProps({
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true
  },
  prefix: {
    type: String
  }
})

const num = ref(0)
const timer = ref<NodeJS.Timer | null>(null)

onMounted(() => {
  const count = props.end - props.start
  const time = 2 * 60
  const add = Math.floor(count / time) || 1
  timer.value = setInterval(() => {
    num.value = num.value + add
  })
})

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value)
  timer.value = null
})

watch(num, value => {
  if (value >= props.end) {
    if (timer.value) clearInterval(timer.value)
    timer.value = null
    num.value = props.end
  }
})
</script>