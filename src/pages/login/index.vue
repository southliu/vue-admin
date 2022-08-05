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
          <Input
            v-model:value="formState.username"
            :allow-clear="true"
            placeholder="用户名"
            data-test="username"
            auto-complete="username"
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
            :allow-clear="true"
            data-test="password"
            auto-complete="current-password"
          >
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
            :loading="loading && !isLock"
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

<script lang="ts">
import type { FormProps } from 'ant-design-vue'
import type { ILoginData } from './model'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '@/servers/login'
import { PASSWORD_RULE } from '@/utils/config'
import { useLoading } from '@/hooks/useLoading'
import { useToken } from '@/hooks/useToken'
import { useMenuStore } from '@/stores/menu'
import { useTabStore } from '@/stores/tabs'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useWatermark } from '@/hooks/useWatermark'
import { permissionsToArray } from '@/utils/permissions'
import { menus } from '@/menus'
import { getMenus, getFirstMenu } from '@/utils/menus'
import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword
} from 'ant-design-vue'
import Logo from '@/assets/images/logo.png'
import PageLoading from '@/components/Loading/PageLoading.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    UserOutlined,
    LockOutlined,
    Form,
    FormItem,
    Button,
    Input,
    InputPassword,
    PageLoading
  },
  setup() {
    const router = useRouter()
    const { loading, startLoading, endLoading } = useLoading()
    const { setToken } = useToken()
    const { RemoveWatermark } = useWatermark()
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
        startLoading()
        const menuStore = useMenuStore()
        const tabStore = useTabStore()
        const { openKeys, menuList } = storeToRefs(menuStore)
        const { setUserInfo, setPermissions } = useUserStore()
        const { data } = await login(values)
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
        // 跳转第一个有效菜单
        const { key, path, title, top } = getFirstMenu(newMenus)
        // 菜单展开，添加标签
        if (top) openKeys.value = [top]
        if (key) tabStore.addTabs({ key, path, title })
        isLock.value = true
        router.push(path || '/')
        endLoading()
      } catch(err) {
        console.log('登录失败:', err)
        isLock.value = false
        endLoading()
      }
    }

    /**
     * 处理失败
     * @param errors - 错误信息
     */
    const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
      console.log('错误信息:', errors)
    }

    return {
      isLock,
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