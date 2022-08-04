import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { login } from '@/servers/login'
import { findTestWrapper } from '../utils/testUtils'
import { useToken } from '@/hooks/useToken'
import { useUserStore } from '@/stores/user'
import { permissionsToArray } from '@/utils/permissions'
import Login from '@/pages/login/index.vue'
import pinia from '@/stores'

// 登录页
describe('login page', () => {
  // 挂载容器
  const wrapper = mount(Login)

  // 是否存在用户名
  it('has a username', () => {
    const username = findTestWrapper(wrapper, 'username')
    expect(username.exists()).toBeTruthy()
  })

  // 是否存在密码
  it('has a password', () => {
    const password = findTestWrapper(wrapper, 'password')
    expect(password.exists()).toBeTruthy()
  })

  // 是否存在按钮
  it('has a button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBeTruthy()
  })

  // 输入账户密码
  it('enter username and password', () => {
    const username = findTestWrapper(wrapper, 'username')
    const password = findTestWrapper(wrapper, 'password')
    username.setValue('admin')
    password.setValue('admin123456')
    expect(wrapper.vm.formState.username).toBe('admin')
    expect(wrapper.vm.formState.password).toBe('admin123456')
  })

  // 接口测试
  it('login api', async () => {
    const { data } = await login(wrapper.vm.formState)
    expect(data.code).toBe(200)
    // 缓存token，为后续接口使用
    const { data: { token, user, permissions } } = data
    const { setToken, getToken } = useToken()
    const {
      setUserInfo,
      setPermissions,
      getPermissions,
      getUserInfo
    } = useUserStore(pinia)
    const newPermissions = permissionsToArray(permissions)
    setToken(token)
    setUserInfo(user)
    setPermissions(newPermissions)
    expect(token).toBe(getToken())
    expect(user).toEqual(getUserInfo())
    expect(newPermissions).toEqual(getPermissions())
  })
})