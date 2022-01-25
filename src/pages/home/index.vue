<template>
  Home
  <div class="go" @click="goLogin">to Login</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const goLogin = () => {
      router.push('/login')
    }

    return {
      goLogin
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