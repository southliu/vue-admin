<template>
  <Tooltip>
    <template #title>主题模式</template>
    <div class="text-lg mr-4">
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
import { ref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import Icon from '@/components/Icon/index.vue'

type IType = 'dark' | 'light'

const theme = ref<IType>('light')

const onChange = (type: IType) => {
  theme.value = type

  switch (type) {
    case 'dark':
      document.body.className = 'theme-dark'
      break

    default:
      document.body.className = 'theme-primary'
      break
  }
}
</script>