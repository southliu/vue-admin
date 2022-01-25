<template>
  Login
  <div class="go" @click="goHome">to Home</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const goHome = () => {
      router.push('/')
    }

    return {
      goHome
    }
  }
})
</script>

<style lang="less" scoped>
  .go {
    color: blue;
    cursor: pointer;
  }
</style>