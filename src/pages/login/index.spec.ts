import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { useToken } from '@/hooks/useToken'
import Login from './index.vue'

// 登录页
describe('login page', () => {
  const wrapper = mount(Login) // 挂载容器

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
    wrapper.vm.formState.username = 'liunanfang'
    wrapper.vm.formState.password = 'liunanfang123@@'
    expect(wrapper.vm.formState.username).toBe('liunanfang')
    expect(wrapper.vm.formState.password).toBe('liunanfang123@@')
  })

  // form提交表单
  it('form submit', async () => {
    const { getToken } = useToken()
    const button = wrapper.find('button')
    button.trigger('click')
    const form = wrapper.find('form')

    await flushPromises()
    console.log('getToken:', getToken())
  })
})