<template>
  <Tooltip placement="bottom">
    <template #title>Github</template>
    <div @click="goGithub">
      <Icon
        class="flex items-center justify-center text-lg mr-10px cursor-pointer"
        icon='mdi:github'
      />
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import { Icon } from '@iconify/vue';

/** 跳转github */
const goGithub = () => {
  window.open('https://github.com/southliu/vue-admin');
};
</script>
