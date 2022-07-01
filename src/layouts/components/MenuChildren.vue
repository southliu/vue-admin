<template>
  <SubMenu
    v-for="item in list"
    :key="item.key"
    :data-title="item.title"
  >
    <template #icon>
      <Icon
        v-if="item?.icon"
        class="mt-2px"
        :icon="item.icon"
        :style="{ fontSize: '16px' }"
      />
    </template>

    <template #title>
      {{ item.title }}
    </template>

    <template
      v-for="child in item.children"
      :key="child.key"
    >
      <MenuItem
        v-if="!child?.children?.length"
        :key="child.path"
        @click="handleClick(child.key, child.path, child.title)"
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
import Icon from '@/components/Icon/index.vue'

// 递归菜单用
export default defineComponent({
  name: 'MenuChildren',
  props: {
    list: {
      type: Array as PropType<ISidebar[]>,
      required: true
    },
    handleClick: {
      type: Function as PropType<(key: string, path: string, title: string) => void>,
      required: true
    }
  },
  components: {
    MenuItem,
    SubMenu,
    Icon
  },
  setup() {
  }
})
</script>