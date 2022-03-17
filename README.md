## 简介

使用了最新的`vue3`,`vite2`,`TypeScript`等主流技术开发，开箱即用的中后台前端解决方案。

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/Southliu/vue-vite-admin.git
```

- 安装依赖

```bash
cd vue-vite-admin
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

## 图标(iconify)

- 参考 [iconify官方地址](https://icon-sets.iconify.design/)
- VS Code安装Iconify IntelliSense - 图标内联显示和自动补全

## Git 贡献提交规范

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

## 计划

- [ ] 主题换肤功能
- [x] 标签页右键刷新和关闭右侧
- [ ] E2E测试
- [ ] 修改密码弹窗
- [x] antv按需加载