<template>
  <div>
    <InputPassword
      allowClear
      :placeholder="PLEASE_ENTER"
      v-bind="{ ...attrs, ...componentProps }"
      :value="value"
      @update:value="handleUpdateValue"
    />

    <StrengthBar
      :strength="strength"
      :class="value ? 'flex' : 'none'"
    />
  </div>
</template>

<script lang="ts" setup>
/**
 * @description: 密码强度组件
 */
import type { InputProps } from 'ant-design-vue';
import { useAttrs, ref } from 'vue';
import { InputPassword } from 'ant-design-vue';
import { PLEASE_ENTER } from '@/utils/config';
import StrengthBar from './components/StrengthBar.vue';

defineOptions({
  name: 'PasswordStrength'
});

interface DefineEmits {
  (e: 'update:value', value: string): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  value?: string;
  componentProps?: InputProps;
}

withDefaults(defineProps<DefineProps>(), {});

const attrs = useAttrs();
const strength = ref(0);

/**
 * 密码强度判断
 * @param value - 值
 */
const handleStrength = (value: string) => {
  let level = 0;
  if (/\d/.test(value)) level++; // 有数字强度加1
  if (/[a-z]/.test(value)) level++; // 有小写字母强度加1
  if (/[A-Z]/.test(value)) level++; // 有大写字母强度加1
  if (value.length > 10) level++; // 长度大于10强度加1
  if (/[\.\~\@\#\$\^\&\*]/.test(value)) level++; // 有以下特殊字符强度加1
  strength.value = level;
};

/**
 * 值更新
 * @param value - 值
 */
const handleUpdateValue = (value: string) => {
  emit('update:value', value);
  handleStrength(value);
};
</script>
