import type { ISidebar } from '@/stores/menu'
import { describe, test, expect, beforeEach } from 'vitest'
import { menus } from '@/menus'
import { getMenus, getFirstMenu, getCurrentMenuByName } from '@/menus/utils/helper'

let data: ISidebar[] = []

beforeEach(() => {
  // 获取菜单列表
  data = getMenus(menus, ['/dashboard', '/authority/menu'])
})

describe('菜单功能:', () => {
  test('获取菜单列表', () => {
    expect(data.length).toBeGreaterThan(0)
  })
  
  test('获取菜单中第一个有效子菜单', () => {
    const obj = getFirstMenu(data)
    expect(obj).toBeTypeOf('object')
  })
  
  test('根据路由获取当前路由菜单', () => {
    const name = '/dashboard'
    const obj = getCurrentMenuByName(name, data)
    expect(obj).toBeTypeOf('object')
  })
})