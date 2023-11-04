<template>
  <div class="tabs flex items-center b-b b-#eee relative">
    <div
      v-for="item in list"
      :key="item.value"
      class="item px-20px py-18px"
      :class="{
        'cursor-pointer': list?.length > 1,
        'active relative text-#FF5f00': active === item.value || list.length === 1
      }"
      @click="handleClick(item.value)"
    >
      <span class="text-16px">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({
  name: 'BasicTabs'
});

type ListArr = { label: string, value?: string | number };

interface DefineProps {
  list: ListArr[];
}

const props = withDefaults(defineProps<DefineProps>(), {});

const active = ref(props.list?.[0]?.value || '');

/**
 * 处理点击事件
 * @param value - 值
 */
const handleClick = (value?: string | number) => {
  if (value === undefined) return;
  active.value = value;
};
</script>

<style lang="less" scoped>
.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: #FF5f00;
    border-radius: 2px;
}
</style>
