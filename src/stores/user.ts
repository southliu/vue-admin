import { defineStore } from 'pinia';

interface UserDataInfo {
  id: number;
  username: string;
  email: string;
  phone: string;
}

interface StateData {
  permissions: string[];
  userInfo: UserDataInfo;
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
  } as StateData),
  actions: {
    /**
     * 设置用户权限
     * @param permissions - 权限
     */
    setPermissions(permissions: string[]) {
      this.permissions = permissions;
    },
    /**
     * 获取用户权限
     */
    getPermissions() {
      return this.permissions;
    },
    /**
     * 设置用户信息
     * @param userInfo - 用户值
     */
    setUserInfo(userInfo: UserDataInfo) {
      this.userInfo = userInfo;
    },
    /**
     * 获取用户信息
     */
    getUserInfo() {
      return this.userInfo;
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
      };
    }
  },
});