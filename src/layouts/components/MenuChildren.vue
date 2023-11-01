<template>
  <template
    v-for="item in list"
    :key="item.key"
  >
    <SubMenu
      v-if="item.children?.length"
      :data-title="item.label"
      :key="item.key"
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
        {{ item.label }}
      </template>

      <MenuChildren
        v-if="item.children?.length"
        :list="item.children"
        :handleClick="handleClick"
      />
    </SubMenu>

    <template v-else>
      <MenuItem
        :key="item.key"
        @click="handleClick(item.key)"
      >
        {{ item.label }}
      </MenuItem>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { MenuItem, SubMenu } from 'ant-design-vue';
import type { SideMenu } from '#/public';
import Icon from '@/components/Icon/index.vue';

defineOptions({
  name: 'MenuChildren'
});

interface DefineProps {
  list: SideMenu[];
  handleClick: (key: string) => void;
}

withDefaults(defineProps<DefineProps>(), {});
</script>