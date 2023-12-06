<template>
  <div v-if="!isLock" class="bg-light-400 w-screen h-screen">
    <div class="box w-300px h-290px p-30px rounded-5px bg-white box-border">
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
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <Input
            v-model:value="formState.username"
            allowClear
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
            allowClear
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
import type { FormProps } from 'ant-design-vue';
import type { LoginData } from './model';
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { login } from '@/servers/login';
import { useRouter } from 'vue-router';
import { setTitle } from '@/utils/helper';
import { useToken } from '@/hooks/useToken';
import { useMenuStore } from '@/stores/menu';
import { useUserStore } from '@/stores/user';
import { PASSWORD_RULE } from '@/utils/verify';
import { useWatermark } from '@/hooks/useWatermark';
import { permissionsToArray } from '@/utils/permissions';
import { handleFilterApiMenu, getFirstMenu } from '@/utils/menu';
import { getSystemMenuTree } from '@/servers/system/menu';
import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword
} from 'ant-design-vue';
import Logo from '@/assets/images/logo.png';
import NProgress from 'nprogress';
import PageLoading from '@/components/Loading/PageLoading.vue';

setTitle('登录');
const router = useRouter();
const userStore = useUserStore();
const menuStore = useMenuStore();
const { setUserInfo, setPermissions } = userStore;
const { setMenus } = menuStore;
const { setToken } = useToken();
const [_, RemoveWatermark] = useWatermark();
const isLoading = ref(false);
const isLock = ref(false);

const formState = reactive<LoginData>({
  username: 'admin',
  password: 'admin123456',
});

onMounted(() => {
  NProgress.done();
  // 清除水印
  RemoveWatermark();
});

/** 获取用户菜单 */
const getUserMenu = async (permissions: string[]) => {
  try {
    isLoading.value = true;
    const { code, data } = await getSystemMenuTree({ isLayout: true });
    if (Number(code) !== 200) return;
    const menuData = handleFilterApiMenu(data, permissions);
    setMenus(menuData);
    return menuData;
  } finally {
    isLoading.value = false;
  }
};

/** 处理跳转第一个有效菜单 */
const handleGoFirstMenu = async (permissions: string[]) => {
  try {
    isLoading.value = true;
    const menuData = await getUserMenu(permissions);
    if (!menuData) return;
    const firstMenu = getFirstMenu(menuData || [], permissions);

    if (!firstMenu) {
      return message.error({ content: '用户暂无权限登录', key: 'menu' });
    }

    setMenus(menuData);
    router.push(firstMenu);
  } finally {
    isLoading.value = false;
  }
};

/**
 * 处理登录
 * @param values - 表单数据
 */
const handleFinish: FormProps['onFinish'] = async (values: LoginData) => {
  try {
    isLoading.value = true;
    const { code, data } = await login(values);
    if (Number(code) !== 200) return;
    const { token, user, permissions } = data;

    if (!permissions?.length || !token) {
      return message.error({ content: '用户暂无权限登录', key: 'permissions' });
    }

    const newPermissions = permissionsToArray(permissions);
    setToken(token);
    setUserInfo(user);
    setPermissions(newPermissions);
    handleGoFirstMenu(newPermissions);
  } finally {
    isLoading.value = false;
  }
};

/**
 * 处理失败
 * @param errors - 错误信息
 */
const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  console.error('错误信息:', errors);
};
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>