<template>
  <div
    v-if="list.length === 0"
    class="flex flex-col items-center pt-5 text-warm-gray-400"
  >
    <Icon class="text-40px" icon="mdi:archive-cancel-outline" />
    <span class="mt-1">暂无搜索结构</span>
  </div>

  <template v-else>
    <div class="mt-5">
      <div
        v-for="item in list"
        :key="item.key"
        class="
          h-56px
          mt-8px
          px-14px
          rounded-4px
          cursor-pointer
          flex
          items-center
          justify-between
          shadow-md
          border
          border-light-500"
        :class="{
          'bg-blue-500': active === item.key,
          'text-white': active === item.key
        }"
        @click="handleClick()"
        @mouseenter="handleMouse(item.key)"
     >
        <div class="flex items-center">
          <Icon class="text-lg mr-1" icon="gg:menu-boxed" />
          <span v-if="item.nav?.length">
            <span v-for="(nav, index) in item.nav" :key="index">
              {{ nav }}{{ index !== item.nav.length - 1 ? " > " : "" }}
            </span>
          </span>
          <span v-else>
            {{ item.label }}
          </span>
        </div>
        <Icon class="icon text-20px p-2px mr-5px" icon="ant-design:enter-outlined" />
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import type { SideMenu } from '#/public';
import { Icon } from '@iconify/vue';

interface DefineEmits {
  (e: 'handleClick'): void;
  (e: 'handleMouse', value: string): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  list: SideMenu[];
  active: string;
}

withDefaults(defineProps<DefineProps>(), {});

/**
 * 处理鼠标经过
 * @param item - 当前值
 */
const handleMouse = (item: string) => {
  emit('handleMouse', item);
};

/**
 * 鼠标点击
 */
const handleClick = () => {
  emit('handleClick');
};
</script>
