<template>
  <div class="flex justify-center">
    <img
      :src="Image"
      alt="Image"
      class="w-980px h-full container"
    >
  </div>
</template>

<script lang="ts" setup>
import Image from '@/assets/images/welcome.png'
import { useToken } from '@/hooks/useToken'
import { useRouter } from 'vue-router'

const { getToken } = useToken()
const router = useRouter()
const token = getToken()
if (!token) router.push('/login')
</script>
