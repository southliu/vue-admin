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

            <template v-else-if="checkPermission(item.permission) && (isShow || minShowNum > index)">
              <CreateBtn
                v-if="item.type === 'create'"
                class="btn-space"
                :isIcon="item.isIcon ?? true"
                :content="item.label"
                :type="item.btnType"
                @click="handleClick(item.value)"
              />

              <UpdateBtn
                v-else-if="item.type === 'update'"
                class="btn-space"
                :content="item.label"
                :type="item.btnType"
                @click="handleClick(item.value)"
              />

              <DeleteBtn
                v-else-if="item.type === 'delete'"
                class="btn-space"
                :isIcon="item.isIcon ?? true"
                :isDanger="item.isDanger ?? true"
                :content="item.label"
                :type="item.btnType"
                @click="handleClick(item.value)"
              />

              <BasicBtn
                v-else
                class="btn-space"
                :type="item.btnType"
                @click="handleClick(item.value)"
              >
                {{ item.label }}
              </BasicBtn>
            </template>
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
import { BasicBtn, CreateBtn, DeleteBtn, UpdateBtn } from '../Buttons';
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
