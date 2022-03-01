<template>
  <header class="header flex justify-end px-6 box-border">
    <a-dropdown class="min-w-100px">
      <a class="ant-dropdown-link flex items-center" @click.prevent>
        <img
          class="avatar rounded-1/2 overflow-hidden object-cover"
          src="@/assets/logo.png"
        >
        <span class="ml-2 mr-1">South</span>
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <form-outlined class="mr-1" />
            <span>修改密码</span>
          </a-menu-item>
          <a-menu-item>
            <logout-outlined class="mr-1" />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LogoutOutlined, FormOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    LogoutOutlined,
    FormOutlined
  },
  setup() {
  }
})
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.header {
  position: fixed;
  top: 0;
  left: @layout_left;
  right: 0;
  height: @layout_top;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 30px;
  height: 30px;
  background-color: #e2e2e2;
}
</style>