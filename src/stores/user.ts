import { defineStore } from 'pinia'

interface IUserInfo {
  id: number;
  username: string;
  email: string;
  phone: string;
}

interface IState {
  permissions: string[];
  userInfo: IUserInfo;
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // 用户权限
    permissions: [],
    // 用户信息
    userInfo: {
      id: 0,
      username: '',
      email: '',
      phone: ''
    }
  } as IState),
  actions: {
    /**
     * 设置用户权限
     * @param permissions - 权限
     */
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },
    /**
     * 设置用户信息
     * @param userInfo - 用户值
     */
    setUserInfo(userInfo: IUserInfo) {
      this.userInfo = userInfo
    },

    /**
     * 清除用户信息
     */
    clearInfo() {
      this.userInfo = {
        id: 0,
        username: '',
        email: '',
        phone: ''
      }
    }
  },
})