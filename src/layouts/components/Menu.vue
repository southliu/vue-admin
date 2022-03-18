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
      <MenuChildren :list="list" :handleClick="handleClick" />
    </Menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { menus } from '@/router/menus'
import type { IMenus } from '@/router/model'
import { useTabStore } from '@/stores/tabs'
import { useRoute, useRouter } from 'vue-router'
import { Menu } from 'ant-design-vue'
import MenuChildren from './MenuChildren.vue'
import Logo from '@/assets/images/logo.png'

export interface ISidebar {
  key: string;
  title: string;
  icon?: string;
  children?: ISidebar[]
}

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
    const list = ref<ISidebar[]>([])
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);

    // 监听路由变化，菜单跟随变化
    watch(() => route.path, value => {
      if ([value] !== selectedKeys.value) {
        selectedKeys.value = [route.path]
      }
    })

    /**
     * 过滤菜单数据
     * @param menus - 菜单数据
     * @param result - 过滤后返回的数据
     */
    const filterMenus = (menus: IMenus[], result: ISidebar[]): ISidebar[] => {
      for (let i = 0; i < menus.length; i++) {
        const item = menus[i];

        // 不符合result条件则跳到下次循环
        if (item?.meta?.isHidden) continue

        // 获取子数据
        const isChildren = item.children && item.children?.length > 0
        const children = isChildren ? filterMenus(item.children as IMenus[], []) : undefined

        // 第一个标签选中
        if (!isChildren && tabStore.tabs.length === 0) {
          tabStore.addTabs({ key: item.path, title: item?.meta?.title || '' })
        }

        result.push({
          key: item.path,
          title: item?.meta?.title || '',
          icon: item?.meta?.icon,
          children
        })
      }
      return result
    }

    onMounted(() => {
      list.value = filterMenus(menus, [])

      // 菜单第一个展开
      if (list.value.length > 0 && openKeys.value.length === 0) {
        openKeys.value = [list.value[0].key]
      }

      // 选中路由当前项
      selectedKeys.value = [route.path]
      console.log('list.value123:', list.value)
      console.log('selectedKeys.value123:', selectedKeys.value)
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
      list,
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