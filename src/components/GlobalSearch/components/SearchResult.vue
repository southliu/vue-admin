<template>
  <div
    v-if="list.length === 0"
    class="flex flex-col items-center pt-5 text-warm-gray-400"
  >
    <Icon class="text-40px" icon="mdi:archive-cancel-outline" />
    <span class="mt-1">暂无搜索结构</span>
  </div>

  <template v-else>
    <ul class="mt-5">
      <li
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
        @mouseenter="handleMouse(item)"
     >
        <div class="flex items-center">
          <Icon class="text-lg mr-1" icon="gg:menu-boxed" />
          <span>
            {{ item.topTitle ? `${item.topTitle} > ` : '' }}
            {{ item.title }}
          </span>
        </div>
        <Icon class="icon text-20px p-2px mr-5px" icon="ant-design:enter-outlined" />
      </li>
    </ul>
  </template>
</template>

<script lang="ts">
import type { IGlobalSearchResult } from '../model'
import { defineComponent, PropType } from 'vue'
import Icon from '@/components/Icon/index.vue'

export default defineComponent({
  name: 'SearchResult',
  emits: ['handleClick', 'handleMouse'],
  props: {
    list: {
      type: Array as PropType<IGlobalSearchResult[]>,
      required: true
    },
    active: {
      type: String,
      required: true
    }
  },
  components: {
    Icon
  },
  setup(props, context) {
    /**
     * 处理鼠标经过
     * @param item - 当前值
     */
    const handleMouse = (item: IGlobalSearchResult) => {
      context.emit('handleMouse', item)
    }

    /**
     * 鼠标点击
     */
    const handleClick = () => {
      context.emit('handleClick')
    }

    return {
      handleMouse,
      handleClick
    }
  }
})
</script>
