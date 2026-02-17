# Control UI Build Failed 修复 Spec

## Why

在Windows上运行 `pnpm ui:build` 时出现 `Error: spawn EINVAL` 错误，导致Control UI无法构建。这是因为Windows上的pnpm是`.cmd`/`.ps1`文件，需要通过shell模式执行。

## What Changes

- **修复scripts/ui.js**：在Windows平台上为spawn调用添加 `shell: true` 选项
- 参考：官方已在 `scripts/test-parallel.mjs` 中应用了相同修复（#1212）

## Impact

- Affected specs: Control UI构建
- Affected code: `scripts/ui.js` 中的 `run()` 和 `runSync()` 函数

## Root Cause Analysis

### 问题现象

```
Error: spawn EINVAL
    at ChildProcess.spawn (node:internal/child_process:421:11)
    at spawn (file:///D:/openclaw-cn/scripts/ui.js:54:17)
```

### 根本原因

1. Windows上pnpm是 `.ps1` 脚本文件（`C:\Users\Administrator\AppData\Roaming\npm\pnpm.ps1`）
2. Node.js的 `spawn()` 在Windows上调用 `.cmd`/`.ps1` 文件时，必须设置 `shell: true`
3. 否则会抛出 `EINVAL` 错误（错误码 -4071）

### 官方修复参考

CHANGELOG.md 第1291行：

```
- UI: enable shell mode for sync Windows spawns to avoid `pnpm ui:build` EINVAL. (#1212)
```

scripts/test-parallel.mjs 第6-8行：

```javascript
// On Windows, `.cmd` launchers can fail with `spawn EINVAL` when invoked without a shell
// (especially under GitHub Actions + Git Bash). Use `shell: true` and let the shell resolve pnpm.
```

### 当前代码问题

scripts/ui.js 第54-58行和第68-72行：

```javascript
function run(cmd, args) {
  const child = spawn(cmd, args, {
    cwd: uiDir,
    stdio: "inherit",
    env: process.env,
    // 缺少 shell: true
  });
}

function runSync(cmd, args, envOverride) {
  const result = spawnSync(cmd, args, {
    cwd: uiDir,
    stdio: "inherit",
    env: envOverride ?? process.env,
    // 缺少 shell: true
  });
}
```

## ADDED Requirements

### Requirement: Windows平台spawn兼容性

系统 SHALL 在Windows平台上正确执行pnpm命令构建Control UI。

#### Scenario: Windows上执行ui:build

- **WHEN** 用户在Windows上运行 `pnpm ui:build` 或Gateway自动构建UI
- **THEN** 系统应成功执行pnpm命令，不抛出EINVAL错误

## MODIFIED Requirements

### Requirement: scripts/ui.js spawn调用

在Windows平台上，spawn和spawnSync调用 SHALL 设置 `shell: true` 选项。

修改前：

```javascript
spawn(cmd, args, { cwd: uiDir, stdio: "inherit", env: process.env });
```

修改后：

```javascript
spawn(cmd, args, {
  cwd: uiDir,
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});
```

## Implementation Notes

1. 只在Windows平台启用 `shell: true`，其他平台保持原样
2. 同时修改 `run()` 和 `runSync()` 两个函数
3. 这是官方已知的Windows兼容性问题，修复方式已在test-parallel.mjs中验证
