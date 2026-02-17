# Tasks

- [x] Task 1: 修复scripts/ui.js中的spawn调用
  - [x] SubTask 1.1: 修改run()函数，添加shell: true选项（仅Windows）
  - [x] SubTask 1.2: 修改runSync()函数，添加shell: true选项（仅Windows）
  - [x] SubTask 1.3: 验证修改后的代码语法正确

- [x] Task 2: 验证Control UI构建
  - [x] SubTask 2.1: 执行 `node scripts/ui.js build` 验证构建成功
  - [x] SubTask 2.2: 检查dist/control-ui/index.html是否生成

- [x] Task 3: 验证Gateway启动
  - [x] SubTask 3.1: 启动Gateway验证UI不再报错
  - [x] SubTask 3.2: 检查日志确认UI构建成功

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
