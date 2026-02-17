# Control UI Build Failed 修复 - 检查清单

## 代码修改检查点

- [x] **检查点 1**: run()函数已添加shell选项
  - 验证: `spawn(cmd, args, { ..., shell: process.platform === "win32" })`

- [x] **检查点 2**: runSync()函数已添加shell选项
  - 验证: `spawnSync(cmd, args, { ..., shell: process.platform === "win32" })`

## 构建验证检查点

- [x] **检查点 3**: UI构建命令执行成功
  - 验证: `node scripts/ui.js build` 无错误退出

- [x] **检查点 4**: Control UI资源已生成
  - 验证: `dist/control-ui/index.html` 文件存在

## Gateway验证检查点

- [x] **检查点 5**: Gateway启动无UI构建错误
  - 验证: 日志中无 "Control UI build failed" 错误

- [x] **检查点 6**: Gateway正常监听
  - 验证: `ws://127.0.0.1:18789` 正常监听

## 最终验收

- [x] **验收检查点**: Windows平台UI构建完全正常
