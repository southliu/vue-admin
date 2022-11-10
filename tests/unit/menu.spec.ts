import type { ISideMenu } from '#/public'
import { describe, test, expect, beforeEach } from 'vitest'
import { defaultMenus } from '@/menus'
import { filterMenus, getFirstMenu, getMenuByKey } from '@/menus/utils/helper'

let data: ISideMenu[] = []
// 模拟权限
const permissions = ['/dashboard', '/system/menu']

beforeEach(() => {
  // 获取菜单列表
  data = filterMenus(defaultMenus, permissions)
})

describe('菜单功能:', () => {
  test('获取菜单列表', () => {
    expect(data.length).toBeGreaterThan(0)
  })
  
  test('获取菜单中第一个有效子菜单', () => {
    const obj = getFirstMenu(data, permissions)
    expect(obj).toBeTypeOf('string')
  })
  
  test('根据路由获取当前路由菜单', () => {
    const params = {
      menus: defaultMenus,
      key: '/dashboard',
      permissions
    }
    const obj = getMenuByKey(params)
    expect(obj).toBeTypeOf('object')
  })
})