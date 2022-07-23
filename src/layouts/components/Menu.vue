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
        class="text-white ml-3 text-xl font-bold truncate"
        :class="{ 'hidden': collapsed }"
      >
        后台系统
      </span>
    </div>
    <div class="menu-height overflow-y-auto">
      <Menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        class="h-full z-1000"
        mode="inline"
        theme="dark"
        :inlineCollapsed="collapsed"
        @openChange="openChange"
      >
        <MenuChildren
          :list="menuList"
          :handleClick="handleClick"
        />
      </Menu>
    </div>

    <div
      v-if="isPhone && !collapsed"
      class="cover fixed right-0 top-0 bottom-0 h-full bg-gray-500 bg-opacity-10 z-2"
      @click="hiddenMenu"
    />
  </div>
</template>

<script lang="ts">
import type { Key } from 'ant-design-vue/lib/_util/type'
import { defineComponent } from 'vue'
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { useRouter } from 'vue-router'
import { Menu } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import MenuChildren from './MenuChildren.vue'
import Logo from '@/assets/images/logo.png'

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
    const router = useRouter()
    const tabStore = useTabStore()
    const menuStore = useMenuStore()
    const {
      isPhone,
      openKeys,
      selectedKeys,
      menuList,
    } = storeToRefs(menuStore)

    /**
     * 菜单展开事件
     * @param keys - 展开下标
     */
    const openChange = (keys: Key[]) => {
      openKeys.value = [keys[keys.length - 1] as string || '']
    }

    /**
     * 点击菜单
     * @param key - 唯一值
     * @param title - 标题
     */
    const handleClick = (key: string, path: string, title: string) => {
      router.push(path)
      tabStore.addTabs({ title, path, key })
      
      // 手机端点击隐藏菜单
      if (isPhone.value) context.emit('toggleCollapsed')
    }

    /** 隐藏菜单 */
    const hiddenMenu = () => {
      context.emit('toggleCollapsed')
    }

    return {
      isPhone,
      Logo,
      menuList,
      selectedKeys,
      openKeys,
      openChange,
      hiddenMenu,
      handleClick,
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.menu-height {
  height: calc(100% - 50px);
}

.cover {
  left: @layout_left;
}
</style>