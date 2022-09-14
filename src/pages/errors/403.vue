<template>
  <div class="absolute left-50% top-50% -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 class="animation w-full text-6rem font-bold">
      403
    </h1>
    <p class="w-full text-20px font-bold mt-15px text-dark-700">
      当前页面无法访问，可能没权限或已删除
    </p>
    <Button class="mt-25px margin-auto" @click="goIndex">
      返回首页
    </Button>
  </div>
</template>

<script lang="ts" setup>
import type { IMenuItem } from '@/stores/menu'
import { Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { useTabStore } from '@/stores/tabs'
import { storeToRefs } from 'pinia'
import { getFirstMenu } from '@/menus/utils/helper'

const router = useRouter()
const menuStore = useMenuStore()
const tabStore = useTabStore()
const { setFirstMenu } = menuStore
const { openKeys, menuList, firstMenu } = storeToRefs(menuStore)

// 跳转首页
const goIndex = () => {
let obj: IMenuItem = { key: '', path: '', top: '', topTitle: '', title: '' }
if (firstMenu.value?.key) {
  obj = firstMenu.value
} else {
  obj = getFirstMenu(menuList.value)
  setFirstMenu(obj)
}
// 跳转第一个有效菜单
const { key, path, title, top } = obj
// 菜单展开，添加标签
if (top) openKeys.value = [top]
if (key) tabStore.addTabs({ key, path, title })
router.push(path)
}
</script>

<style lang="less" scoped>
.animation {
  animation: shake .6s ease-in-out infinite alternate;
}

@keyframes shake {
  0% {
    transform: translate(-1px)
  }
  
  10% {
    transform: translate(2px, 1px)
  }
  
  30% {
    transform: translate(-3px, 2px)
  }
  
  35% {
    transform: translate(2px, -3px);
    filter: blur(4px)
  }
  
  45% {
    transform: translate(2px, 2px) skewY(-8deg) scaleX(.96);
    filter: blur(0)
  }
  
  50% {
    transform: translate(-3px, 1px)
  }
}
</style>