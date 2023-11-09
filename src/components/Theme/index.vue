<template>
  <Tooltip placement="bottom">
    <template #title>主题模式</template>
    <div class="flex items-center justify-center text-lg mr-15px cursor-pointer">
      <Icon
        v-if="theme === 'light'"
        icon="mdi-white-balance-sunny"
        @click="onChange('dark')"
      />
      <Icon
        v-else
        icon="mdi-moon-waning-crescent"
        @click="onChange('light')"
      />
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { Icon } from '@iconify/vue';

type TypeData = 'dark' | 'light'

const key = 'theme';
const themeCache = (localStorage.getItem(key) || 'light') as TypeData;
const theme = ref<TypeData>(themeCache);

onMounted(() => {
  if (!themeCache) {
    localStorage.setItem(key, 'light');
  }
  if (themeCache === 'dark') {
    document.body.className = 'theme-dark';
  }
});

const onChange = (type: TypeData) => {
  localStorage.setItem(key, type);
  theme.value = type;

  switch (type) {
    case 'dark':
      document.body.className = 'theme-dark';
      break;

    default:
      document.body.className = 'theme-primary';
      break;
  }
};
</script>