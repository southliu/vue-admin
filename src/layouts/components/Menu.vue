<template>
  <div
    class="menu py-1 box-border transition-all"
    :class="{ 'menu-close': collapsed }"
  >
    <div
      class="flex content-center px-5 py-2 cursor-pointer"
      :class="{ 'justify-center': collapsed }"
    >
      <img class="logo object-contain" src="@/assets/logo.png">
      <span
        class="title ml-3 text-xl font-bold truncate"
        :class="{ 'title-close': collapsed }"
      >
        后台系统
      </span>
    </div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class="overflow-y-auto h-full"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="handleClick"
    >
      <a-sub-menu v-for="item in list" :key="item.key" @titleClick="titleClick">
        <template v-if="item?.icon" #icon>
          <div class="iconfont" :class="item.icon"></div>
        </template>
        <template #title>{{ item.title }}</template>
        <a-menu-item v-for="child in item.children" :key="child.key">
          {{ child.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { menus } from '@/router/menus'
import {
  MailOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import { IMenus } from '@/router/model';

interface ISidebar {
  key: string | number;
  title: string;
  icon?: string;
  children?: ISidebar[]
}

export default defineComponent({
  components: {
    MailOutlined,
    AppstoreOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const list = ref<ISidebar[]>([])
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);

    // 过滤菜单数据
    const filterMenus = (menus: IMenus[], list: ISidebar[]): ISidebar[] => {
      for (let i = 0; i < menus.length; i++) {
        const item = menus[i];
        // 不符合list条件则跳到下次循环
        if (item?.meta?.isHidden) continue

        // 获取子数据
        const isChildren = item.children && item.children?.length > 0
        const children = isChildren ? filterMenus(item.children as IMenus[], []) : undefined

        // 菜单第一个展开
        if (isChildren && openKeys.value.length === 0) {
          // const selectedKeys = item.children?.[0] || []
          // selectedKeys.value = selectedKeys
          openKeys.value = [item.name as string]
        }

        list.push({
          key: item.name as string,
          title: item?.meta?.title || '',
          icon: item.meta.iconfont,
          children
        })
      }
      return list
    }

    onMounted(() => {
      list.value = filterMenus(menus, [])
    })

    const handleClick = (e: MouseEvent) => {
      console.log('click', e);
    };

    const titleClick = (e: Event) => {
      console.log('titleClick', e);
    };

    return {
      list,
      selectedKeys,
      openKeys,
      handleClick,
      titleClick,
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.menu {
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #000;
  width: @layout_left;
}

.menu-close {
  width: @layout_left_close !important;
}

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