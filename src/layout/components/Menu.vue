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
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <a-menu-item-group key="g2" title="Item 2">
          <a-menu-item key="3">Option 3</a-menu-item>
          <a-menu-item key="4">Option 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub2" @titleClick="titleClick">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Two</template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { menus } from '@/router/menus'
import type { MenuProps } from 'ant-design-vue';
import {
  MailOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

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
    const list = ref(menus)
    const selectedKeys = ref<string[]>(['1']);
    const openKeys = ref<string[]>(['sub1']);

    const handleClick: MenuProps['onClick'] = e => {
      console.log('click', e);
    };
    const titleClick = (e: Event) => {
      console.log('titleClick', e);
    };
    watch(
      () => openKeys,
      val => {
        console.log('openKeys', val);
      },
    );

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