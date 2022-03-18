<template>
  <SubMenu
    v-for="item in list"
    :key="item.key"
    :data-title="item.title"
  >
    <template v-if="item?.icon" #icon>
      <span class="iconify" :data-icon="item.icon"></span>
    </template>

    <template #title>{{ item.title }}</template>

    <template
      v-for="child in item.children"
      :key="child.key"
    >
      <MenuItem
        v-if="!child?.children?.length"
        :key="child.key"
        @click="handleClick(child.key, child.title)"
      >
        {{ child.title }}
      </MenuItem>

      <MenuChildren
        v-if="!!child?.children?.length"
        :list="[child]"
        :handleClick="handleClick"
      />
    </template>
  </SubMenu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MenuItem, SubMenu } from 'ant-design-vue'
import type { ISidebar } from '@/stores/menu'

// 递归菜单用
export default defineComponent({
  name: 'MenuChildren',
  props: {
    list: {
      type: Array as PropType<ISidebar[]>,
      required: true
    },
    handleClick: {
      type: Function as PropType<(key: string, title: string) => void>,
      required: true
    }
  },
  components: {
    MenuItem,
    SubMenu
  },
  setup() {
  }
})
</script>