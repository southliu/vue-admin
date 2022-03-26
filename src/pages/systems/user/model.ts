// 用户请求数据
export interface ISystemUser {
  username: string;
  password: string;
}

// 接口返回数据
export interface ISystemUserResult {
  token: string;
  id: number;
  username: string;
  real_name: string;
  roles_name: string;
  phone: string;
  email: string;
  status: number;
}