// 用户请求数据
export interface ISystemMenu {
  status: string;
  name: string;
  controller: string;
}

// 接口返回数据
export interface ISystemMenuResult {
  token: string;
  id: number;
  username: string;
  real_name: string;
  roles_name: string;
  phone: string;
  email: string;
  status: number;
}