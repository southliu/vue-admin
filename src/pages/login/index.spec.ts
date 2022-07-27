import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { login } from '@/servers/login'
import Login from './index.vue'

// 登录页
describe('login page', () => {
  // 挂载容器
  const wrapper = mount(Login)

  // 至少两个输入框
  it('at least two input', () => {
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  // 是否存在按钮
  it('has a button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBeTruthy()
  })

  // 输入账户密码
  it('enter username and password', () => {
    wrapper.vm.formState.username = 'test123456789'
    wrapper.vm.formState.password = 'test123456789'
    expect(wrapper.vm.formState.username).toBe('test123456789')
    expect(wrapper.vm.formState.password).toBe('test123456789')
  })

  // 接口提交
  it('login api', async () => {
    const { data } = await login(wrapper.vm.formState)
    expect(data.code).toBe(200)
  })
})