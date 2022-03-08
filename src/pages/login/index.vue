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
      <Form
        :model="formState"
        name="horizontal_login"
        autocomplete="on"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <Input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </Input>
        </FormItem>

        <FormItem
          name="password"
          :rules="[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码最少6位!' }
          ]"
        >
          <InputPassword v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </InputPassword>
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            html-type="submit"
            class="w-full mt-5px rounded-5px tracking-2px"
            :disabled="formState.username === '' || formState.password.length < 6"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import type { FormProps } from 'ant-design-vue';
  import type { ILogin } from './model'
  import API from '@/servers/login'
  import { useToken, useHistory } from '@/hooks';
  import {
    Form,
    FormItem,
    Button,
    Input,
    InputPassword
  } from 'ant-design-vue'

  export default defineComponent({
    components: {
      UserOutlined,
      LockOutlined,
      Form,
      FormItem,
      Button,
      Input,
      InputPassword
    },
    setup() {
      const formState = reactive<ILogin>({
        username: '',
        password: '',
      });

      // 处理登录
      const handleFinish: FormProps['onFinish'] = values => {
        console.log(values, formState);
        useToken("123")
        useHistory('/system/user')
        API.login(values).then(e => {
          console.log('e:', e)
          useHistory('/system/user')
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