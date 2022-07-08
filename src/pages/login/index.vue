<template>
  <div class="bg-light-400 w-screen h-screen">
    <div class="box w-300px h-290px p-30px rounded-5px bg-white">
      <div class="pb-30px pt-10px flex items-center justify-center">
        <img
          class="mr-2 object-contain"
          :width="30"
          :height="30"
          :src="Logo"
          alt="LOGO"
        />
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
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <Input v-model:value="formState.username" placeholder="用户名" autoComplete="username">
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
          <InputPassword v-model:value="formState.password" autoComplete="current-password">
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
            :loading="loading"
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
import type { FormProps } from 'ant-design-vue'
import type { ILoginData } from './model'
import { defineComponent, onMounted, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '@/servers/login'
import { PASSWORD_RULE } from '@/utils/config'
import { useLoading } from '@/hooks/useLoading'
import { useToken } from '@/hooks/useToken'
import { useMenuStore } from '@/stores/menu'
import { useTabStore } from '@/stores/tabs'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useWatermark } from '@/hooks/useWatermark'
import { checkPermission, permissionsToArray } from '@/utils/permissions'
import { menus } from '@/menus'
import { getMenus, getFirstMenu, getCurrentMenuByRoute } from '@/utils/menus'
import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword
} from 'ant-design-vue'
import Logo from '@/assets/images/logo.png'

export default defineComponent({
  name: 'Login',
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
    const router = useRouter()
    const menuStore = useMenuStore()
    const tabStore = useTabStore()
    const { loading, startLoading, endLoading } = useLoading()
    const { setUserInfo, setPermissions } = useUserStore()
    const { setToken } = useToken()
    const { openKeys, menuList } = storeToRefs(menuStore)
    const { RemoveWatermark } = useWatermark()

    const formState = reactive<ILoginData>({
      username: '',
      password: '',
    });

    onMounted(() => {
      // 清除水印
      RemoveWatermark()
    })

    /**
     * 处理登录
     * @param values - 表单数据
     */
    const handleFinish: FormProps['onFinish'] = async (values: ILoginData) => {
      startLoading()
      try {
        const { data } = await login(values)
        if (data) {
          const { data: { token, user, permissions } } = data
          const newPermissions = permissionsToArray(permissions)
          setToken(token)
          setUserInfo(user)
          setPermissions(newPermissions)
          
          // 菜单处理
          const newMenus = getMenus(menus, newPermissions)
          menuList.value = newMenus
          // 如果菜单为空，跳转空白页
          if (newMenus.length === 0) router.push('/empty')
          // 有跳转首页权限则跳转
          const isDashboard = checkPermission('/dashboard', newPermissions)
          const { key, path, title, top } = isDashboard ?
            getCurrentMenuByRoute('/dashboard', newMenus) :
            getFirstMenu(newMenus)
          openKeys.value = [top]
          tabStore.addTabs({ key, path, title })
          
          if (isDashboard) {
            const nextPath = '/dashboard'
            router.push(nextPath)
          } else {
            router.push(path)
          }
        }
      } catch(err) {}
      endLoading()
    };

    /**
     * 处理失败
     * @param errors - 错误信息
     */
    const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
      console.log('错误信息:', errors);
    };

    return {
      loading,
      formState,
      PASSWORD_RULE,
      Logo,
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