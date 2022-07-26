import type { ISidebar } from '../src/stores/menu'
import { describe, test, expect, beforeEach } from 'vitest'
import { menus } from '../src/menus'
import { getMenus, getFirstMenu, getCurrentMenuByName } from '../src/utils/menus'

let data: ISidebar[] = []

beforeEach(() => {
  // 获取菜单列表
  data = getMenus(menus, ['/stat/data-trends', '/authority/menu'])
})

describe('菜单功能:', () => {
  test('获取菜单列表', () => {
    expect(data.length).toBe(2)
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