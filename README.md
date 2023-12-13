## ✨ 简介

使用`Vue3`,`Vite`,`TypeScript`,`Ant Design Vue`等主流技术开发的开箱即用的中后台前端项目，支持`keepalive`功能，`Vite`自动生成路由，`pinia`状态管理，`vxe-table`虚拟滚动表格，`UnoCss`开发样式。

## 🚀 项目演示
[演示地址](https://iamsouth.gitee.io)

## 💻 安装使用

- 获取项目代码

```bash
git clone https://github.com/southliu/vue-admin.git
```

- 选择目录

```bash
cd vue-admin
```

- 安装全局依赖依赖，存在则不用安装

```bash
npm i -g pnpm
```

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## 🧩 图标(iconify)

- 参考 [iconify官方地址](https://icon-sets.iconify.design/)
- VS Code安装Iconify IntelliSense - 图标内联显示和自动补全

## 🎗️ Git 提交示例
### Git提交不规范会导致无法提交，`feat`关键字可以按照下面`Git 贡献提交规范`来替换。
```
git add .
git commit -m "feat: 新增功能"
git push
```

## 🎯 Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

- 如果无法运行commitlint，请运行以下指令：

```
  npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

## 💡 计划

- [x] 主题换肤功能
- [ ] i18n语言切换
- [x] 表单嵌套结构
- [x] 包分析工具
- [x] cli生成增删改查
- [x] 剪切板功能
- [x] 富文本组件
- [x] 虚拟滚动组件
- [x] 水印组件
- [x] 密码强度显示
- [x] 内容最大化功能
- [x] 404错误页
- [x] 封装文档说明
- [x] 密码规则
- [x] 弹窗拖拽功能
- [x] 弹窗最大化功能
- [x] Icon封装
- [x] 标签页右键功能
- [x] 搜索菜单功能

## 🐓 keep-alive说明：
### 如果需要使用keep-alive功能则需要文件名里面添加name即可。
```ts
/**
 * 需要通过路径转换成对应的name
 * /system/user => SystemUser
 * /content/article => ContentArticle
 */
defineOptions({
  name: 'SystemUser'
});
```

## 🐵 关于封装
  1. 功能扩展，在原有的api上拓展。
  2. 功能整合，合并两个或两个以上组件的api。
  3. 样式统一，避免后期样式变动，导致牵一发而动全身。

## 🤖 组件说明

### 表单(BasicForm):
| 属性名 | 必填 | 属性说明 |
| --- | --- | --- |
| name | 是 | 表单域字段，如果是嵌套格式，则为数组 |
| label | 是 | 表单标签 |
| rules | 否 | 表单规则，[参考模板](https://ant.design/components/form-cn/#components-form-demo-basic) |
| component | 是 | 组件名，参考Antv名称，如Input |
| componentProps | 否 | 组件属性，参考对应文档API，方法都是**on开头**，如dropdownVisibleChange要改为onDropdownVisibleChange |

### 表格(BasicTable):
| 属性名 | 必填 | 属性说明 |
| --- | --- | --- |
| id | 否 | 唯一标识(被某些特定的功能所依赖) |
| data | 是 | 表格数据 |
| columns | 是 | 列数据 |
| isLoading | 否 | 加载动画 |
| offsetHeight | 否 | 高度偏移差，当表格高度过高出现滚动条的时候使用 |
| isResize | 否 | 是否开启监听窗口变化而更改高度 |

### 分页器(BasicPagination):
| 属性名 | 必填 | 属性说明 |
| --- | --- | --- |
| total | 否 | 数据总数 |
| page | 是 | 当前页数 |
| pageSize | 是 | 每页条数 |
| isLoading | 否 | 加载动画 |

### API下拉框(ApiSelect、ApiTreeSelect):
| 属性名 | 必填 | 属性说明 |
| --- | --- | --- |
| value | 否 | 下拉框绑定值 |
| componentProps | 否 | 下拉框值，[ApiSelect属性](https://www.antdv.com/components/select-cn)，[ApiTreeSelect属性](https://www.antdv.com/components/tree-select-cn) |
| api | 是 | API接口 |
| params | 否 | 接口参数 |
| onDropdownVisibleChange | 否 | 展开下拉菜单的回调 |
### 自定义组件
#### 业务组件存放在`src/components/Business`目录下，每次新增组件想要在src/components/Business/index.tsx文件中引入。
