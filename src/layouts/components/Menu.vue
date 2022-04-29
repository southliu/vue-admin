<template>
  <div class="py-1 box-border transition-all">
    <div
      class="flex content-center px-5 py-2 cursor-pointer"
      :class="{ 'justify-center': collapsed }"
    >
      <Image
        class="object-contain"
        :width="30"
        :height="30"
        :src="Logo"
        alt="LOGO"
      />
      <span
        class="title ml-3 text-xl font-bold truncate"
        :class="{ 'title-close': collapsed }"
      >
        后台系统
      </span>
    </div>
    <Menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class="overflow-y-auto h-full"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <MenuChildren :list="menuList" :handleClick="handleClick" />
    </Menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { menus } from '@/menus'
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Image } from 'ant-design-vue'
import MenuChildren from './MenuChildren.vue'
import Logo from '@/assets/images/logo.png'
import { getMenus, menusToArray } from '@/utils/menus'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'MenuLayout',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Menu,
    MenuChildren,
    Image
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const tabStore = useTabStore()
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);
    const menuStore = useMenuStore()
    const { menuList, menuArr } = storeToRefs(menuStore)

    // 监听路由变化，菜单跟随变化
    watch(() => route.path, value => {
      if ([value] !== selectedKeys.value) {
        selectedKeys.value = [route.path]
      }
    })

    onMounted(() => {
      menuList.value = getMenus(menus)
      menuArr.value = menusToArray(menus)

      // 选中路由当前项
      selectedKeys.value = [route.path]

      // 菜单第一个展开
      if (menuList.value.length > 0 && openKeys.value.length === 0) {
        openKeys.value = [menuList.value[0].key]
      }

      // 获取当前路由标签
      for (let i = 0; i < menuArr.value.length; i++) {
        const element = menuArr.value[i];
        const { key, title } = element
        if (key === route.path) {
          tabStore.addTabs({ key, title })
          break
        }
      }
    })

    /**
     * 点击菜单
     * @param key - 唯一值
     * @param title - 标题
     */
    const handleClick = (key: string, title: string) => {
      router.push(key)
      tabStore.addTabs({ title, key })
    }

    // 监听菜单选中值是否和路由值匹配
    watch(() => route.path, value => {
      if ([value] !== selectedKeys.value) {
        selectedKeys.value = [route.path]
      }
    })

    return {
      Logo,
      menuList,
      selectedKeys,
      openKeys,
      handleClick,
    }
  }
})
</script>

<style lang="less" scoped>
.title {
  color: #fff;
}

.title-close {
  display: none;
}
</style>