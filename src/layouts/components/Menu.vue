<template>
  <div class="py-1 box-border transition-all overflow-hidden">
    <div
      class="flex content-center px-5 py-2 cursor-pointer"
      :class="{ 'justify-center': collapsed }"
    >
      <img
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
      class="overflow-y-auto h-full z-1000"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <MenuChildren :list="menuList" :handleClick="handleClick" />
    </Menu>

    <div
      v-if="isPhone && !collapsed"
      class="cover fixed right-0 top-0 bottom-0 h-full z-999"
      @click="hiddenMenu"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { menus } from '@/menus'
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
  emits: ['toggleCollapsed'],
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
  setup(props,context) {
    const route = useRoute()
    const router = useRouter()
    const tabStore = useTabStore()
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);
    const menuStore = useMenuStore()
    const { isPhone, menuList, menuArr } = storeToRefs(menuStore)

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
      
      // 手机端点击隐藏菜单
      if (isPhone) context.emit('toggleCollapsed')
    }

    /** 隐藏菜单 */
    const hiddenMenu = () => {
      context.emit('toggleCollapsed')
    }

    // 监听菜单选中值是否和路由值匹配
    watch(() => route.path, value => {
      if ([value] !== selectedKeys.value) {
        selectedKeys.value = [route.path]
      }
    })

    return {
      isPhone,
      Logo,
      menuList,
      selectedKeys,
      openKeys,
      hiddenMenu,
      handleClick,
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.title {
  color: #fff;
}

.title-close {
  display: none;
}

.cover {
  left: @layout_left;
  background: rgba(0, 0, 0, 0.1);
}
</style>