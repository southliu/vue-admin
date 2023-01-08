<template>
  <div v-if="!isLock" class="bg-light-400 w-screen h-screen">
    <div class="box w-300px h-290px p-30px rounded-5px bg-white">
      <div class="pb-30px pt-10px flex items-center justify-center">
        <img
          class="mr-2 object-contain"
          :width="30"
          :height="30"
          :src="Logo"
          alt="LOGO"
        />
        <span class="text-xl font-bold tracking-2px color-#000">
          系统登录
        </span>
      </div>
      <Form
        :model="formState"
        name="horizontal_login"
        autoComplete="on"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <Input
            v-model:value="formState.username"
            :allowClear="true"
            placeholder="用户名"
            autoComplete="username"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </Input>
        </FormItem>

        <FormItem
          name="password"
          :rules="[
            { required: true, message: '请输入密码' },
            PASSWORD_RULE
          ]"
        >
          <InputPassword
            v-model:value="formState.password"
            :allowClear="true"
            placeholder="密码"
            autoComplete="current-password"
          >
           <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </InputPassword>
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            class="w-full mt-5px rounded-5px tracking-2px"
            :loading="isLoading && !isLock"
            :disabled="formState.username === '' || formState.password.length < 6 || isLock"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>

  <PageLoading v-else />
</template>

<script lang="ts" setup>
import type { FormProps } from 'ant-design-vue'
import type { ILoginData } from './model'
import { message } from 'ant-design-vue'
import { onMounted, reactive, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '@/servers/login'
import { PASSWORD_RULE } from '@/utils/config'
import { useToken } from '@/hooks/useToken'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useWatermark } from '@/hooks/useWatermark'
import { useTitle } from '@/hooks/useTitle'
import { permissionsToArray } from '@/utils/permissions'
import { defaultMenus } from '@/menus'
import { getFirstMenu } from '@/menus/utils/helper'
import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword
} from 'ant-design-vue'
import Logo from '@/assets/images/logo.png'
import PageLoading from '@/components/Loading/PageLoading.vue'

useTitle('登录')
const router = useRouter()
const userStore = useUserStore()
const { setUserInfo, setPermissions } = userStore
const { setToken } = useToken()
const { RemoveWatermark } = useWatermark()
const isLoading = ref(false)
const isLock = ref(false)

const formState = reactive<ILoginData>({
  username: 'admin',
  password: 'admin123456',
})

onMounted(() => {
  // 清除水印
  RemoveWatermark()
})

/**
 * 处理登录
 * @param values - 表单数据
 */
const handleFinish: FormProps['onFinish'] = async (values: ILoginData) => {
  try {
    isLoading.value = true
    const { data } = await login(values)
    const { data: { token, user, permissions } } = data

    if (!permissions?.length || !token) {
      return message.error({ content: '用户暂无权限登录', key: 'permissions' })
    }

    const newPermissions = permissionsToArray(permissions)
    const firstMenu = getFirstMenu(defaultMenus, newPermissions)
    setToken(token)
    setUserInfo(user)
    setPermissions(newPermissions)
    router.push(firstMenu)
  } finally {
    isLoading.value = false
  }
}

/**
 * 处理失败
 * @param errors - 错误信息
 */
const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  console.error('错误信息:', errors)
}
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>