<template>
  <div class="bg-light-400 w-screen h-screen">
    <div class="box w-300px h-290px p-30px rounded-5px bg-white">
      <div class="pb-30px pt-10px flex items-center justify-center">
        <img
          class="w-30px h-30px mr-2 object-contain"
          src="@/assets/images/logo.png"
          alt="LOGO"
        >
        <span class="text-xl font-bold tracking-2px">系统登录</span>
      </div>
      <a-form
        :model="formState"
        name="horizontal_login"
        autocomplete="on"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码最少6位!' }
          ]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="w-full mt-5px rounded-5px tracking-2px"
            :disabled="formState.username === '' || formState.password.length < 6"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { FormProps } from 'ant-design-vue';
import { ILogin } from './model'
import API from '@/servers/user'
import { useToken } from '@/hooks';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter()

    const formState = reactive<ILogin>({
      username: '',
      password: '',
    });

    // 处理登录
    const handleFinish: FormProps['onFinish'] = values => {
      console.log(values, formState);
      useToken("123")
      router.push('/')
      API.login(values).then(e => {
        console.log('e:', e)
        router.push('/')
      })
    };

    // 处理失败
    const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
      console.log(errors);
    };

    return {
      formState,
      handleFinish,
      handleFinishFailed,
    }
  }
})
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>