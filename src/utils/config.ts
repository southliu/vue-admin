export const TITLE_PREFIX = '后台-' // 标题前缀
export const TOKEN = 'admin_token' // token名称
export const USERNAME = 'admin_username' // 用户名

// 密码规则
export const passwordRule = {
  pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@\.\_\-*]{6,30}$/,
  message: '密码为6-30位必须包含字母和数字!'
}