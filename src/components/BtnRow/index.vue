<template>
  <div class="flex items-center justify-between mb-10px">
      <div class="flex items-center">
        <slot />

        <template v-if="validNum">
          <div
            v-for="(item, index) in list"
            :key="item.value"
          >
            <slot v-if="item.isSlot" :name="item.value" />
            <BasicBtn
              v-else-if="checkPermission(item.permission)"
              v-show="(isShow || minShowNum > index)"
              class="btn-space"
              @click="handleClick(item.value)"
            >
              {{ item.label }}
            </BasicBtn>
          </div>

          <BasicBtn
            v-if="validNum > 1"
            @click="handleShowBtn"
          >
            <template #icon>
              <LeftOutlined v-if="isShow" />
              <RightOutlined v-else />
            </template>

            {{ isShow ? '收起' : '批量操作' }}
          </BasicBtn>
        </template>
      </div>

      <slot name="right" />
    </div>
</template>

<script lang="ts" setup>
import type { BtnRowList } from './model';
import { ref, computed } from 'vue';
import { BasicBtn } from '../Buttons';
import { checkPermission } from '@/utils/permissions';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

interface DefineEmits {
  (e: 'click', value: string): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  list?: BtnRowList[];
  isDefaultShow?: boolean;
  minShowNum?: number; // 最少显示数
}

const props = withDefaults(defineProps<DefineProps>(), {
  isDefaultShow: true,
  minShowNum: 0
});

const isShow = ref(props.isDefaultShow); // 展开/收起

const validNum = computed(() => {
  let result = 0;

  if (props?.list) {
    for (let i = 0; i < (props?.list as BtnRowList[])?.length; i++) {
      const item = props.list[i];
      if (checkPermission(item.permission)) result++;
    }
  }

  return result;
});

/**
 * 点击按钮
 * @param value - 值
 */
const handleClick = (value: string) => {
  emit('click', value);
};

/** 点击展开/显示 */
const handleShowBtn = () => {
  isShow.value = !isShow.value;
};
</script>
