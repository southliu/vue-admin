import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { login } from '@/servers/login'
import { findTestWrapper } from '@/utils/testUtils'
import Login from './index.vue'

// 登录页
describe('login page', () => {
  // 挂载容器
  const wrapper = mount(Login)

  // 是否存在用户名
  it('has a username', () => {
    const username = findTestWrapper(wrapper, 'username')
    expect(username.exists()).toBeTruthy
  })

  // 是否存在密码
  it('has a password', () => {
    const password = findTestWrapper(wrapper, 'password')
    expect(password.exists()).toBeTruthy
  })

  // 是否存在按钮
  it('has a button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBeTruthy()
  })

  // 输入账户密码
  it('enter username and password', () => {
    wrapper.vm.formState.username = 'testPassword'
    wrapper.vm.formState.password = 'testPassword123&&'
    expect(wrapper.vm.formState.username).toBe('testPassword')
    expect(wrapper.vm.formState.password).toBe('testPassword123&&')
  })

  // 接口提交
  it('login api', async () => {
    const { data } = await login(wrapper.vm.formState)
    expect(data.code).toBe(200)
  })
})