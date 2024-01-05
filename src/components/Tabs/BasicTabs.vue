<template>
  <div class="tabs flex items-center justify-between b-b b-#eee relative">
    <div class="flex">
      <div
        v-for="item in list"
        :key="item.value"
        v-show="!item.hidden"
      >
        <div
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
    </div>

    <slot name="right" />
  </div>
</template>

<script lang="ts" setup>
import type { TabData } from './model';
import { ref, watch } from 'vue';

defineOptions({
  name: 'BasicTabs'
});

interface DefineEmits {
  (e: 'active', value: string | number): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  defaultActive?: string;
  list: TabData[];
}

const props = withDefaults(defineProps<DefineProps>(), {});

const active = ref(props?.defaultActive || props.list?.[0]?.value || '');

watch(() => props.defaultActive, value => {
  active.value = value || '';
});

/**
 * 处理点击事件
 * @param value - 值
 */
const handleClick = (value?: string | number) => {
  if (value === undefined) return;
  active.value = value;
  emit('active', value);
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
