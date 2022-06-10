/**
 * 配置项
 */

export const TITLE_PREFIX = '后台-' // 标题前缀
export const TOKEN = 'admin_token' // token名称
export const USERNAME = 'admin_username' // 用户名

// 公共组件默认值
export const PLEASE_ENTER = '请输入' // 输入框默认文字
export const PLEASE_SELECT = '请选择'// 选择框默认文字
export const MAX_TAG_COUNT = 'responsive' // 最多显示多少个标签，responsive：自适应
export const INPUT_REQUIRED = [{ required: true, message: PLEASE_ENTER }] // 输入框必填校验
export const SELECT_REQUIRED = [{ required: true, message: PLEASE_SELECT }]// 选择框必填校验

// 新增/编辑标题
export const ADD_TITLE = '新增'
export const EDIT_TITLE = (name: string) => `编辑${ name ? `[${name}]` : '' }`


// 密码规则
export const passwordRule = {
  pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@\.\_\-*]{6,30}$/,
  message: '密码为6-30位必须包含字母和数字!'
}