<template>
  <div class="py-1 box-border transition-all">
    <div
      class="flex content-center px-5 py-2 cursor-pointer"
      :class="{ 'justify-center': collapsed }"
    >
      <img class="logo object-contain" :src="Logo">
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
import { menus } from '@/router/menus'
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { useRoute, useRouter } from 'vue-router'
import { Menu } from 'ant-design-vue'
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
    MenuChildren
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

      /**
       * TODO: 根据路由获取第一个标签
       */
      tabStore.addTabs({ key: '/system/user', title: '用户管理' })

      // 菜单第一个展开
      if (menuList.value.length > 0 && openKeys.value.length === 0) {
        openKeys.value = [menuList.value[0].key]
      }

      // 选中路由当前项
      selectedKeys.value = [route.path]
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
      console.log(value)
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
.logo {
  height: 30px;
}

.title {
  color: #fff;
}

.title-close {
  display: none;
}
</style>