# OpenClaw-CN 全面汉化规格说明

## Why

用户希望将所有可汉化的英文文本翻译为中文，包括：

- 启动标语(taglines)
- 节日消息
- 机器人命令描述
- 错误消息
- 日志消息
- 帮助文档
- UI文本（按钮、提示等）
- OpenClaw专有术语

采用"双保险"策略：同时修改源代码(src)和编译后文件(dist)，确保：

- 立即生效（dist文件）
- 持久生效（src文件，未来重新编译后仍有效）
- 无需重新编译

## What Changes

- **新增**: 全面汉化脚本 `scripts/translate-comprehensive.cjs`
- **修改**: 所有包含英文UI文本的源代码文件(src/\*_/_.ts)
- **修改**: 所有包含英文UI文本的编译文件(dist/\*_/_.js)
- **翻译内容**:
  - 100+ 启动标语
  - 11 节日消息
  - 30+ 命令描述
  - 50+ 错误消息
  - 100+ 日志消息
  - UI按钮文本(OK/Cancel/Yes/No等)
  - OpenClaw专有术语

## Impact

- **受影响范围**: 整个项目的用户界面文本
- **关键文件**:
  - `src/cli/tagline.ts` - 启动标语源文件
  - `src/auto-reply/commands-registry.data.ts` - 命令描述源文件
  - `dist/index.js` - 主编译文件
  - `dist/**/*.js` - 所有编译后的JS文件

## ADDED Requirements

### Requirement: 全面汉化执行

系统应提供一个全面的汉化脚本，能够自动将所有英文UI文本替换为中文。

#### Scenario: 执行汉化脚本

- **GIVEN** 用户运行汉化脚本
- **WHEN** 脚本处理src和dist目录
- **THEN** 所有预定义的英文文本应被替换为对应的中文
- **AND** 源代码和编译文件应同时被修改

#### Scenario: 汉化内容覆盖

- **GIVEN** 汉化脚本包含2000+翻译条目
- **WHEN** 脚本扫描项目文件
- **THEN** 应覆盖以下类别：
  - 启动标语和节日消息
  - 机器人命令和参数描述
  - 错误和警告消息
  - 日志和信息消息
  - UI交互文本
  - OpenClaw专有名词

#### Scenario: 无需重新编译

- **GIVEN** dist文件已被汉化
- **WHEN** 用户直接运行程序
- **THEN** 应显示中文界面，无需重新编译

## MODIFIED Requirements

无（此为新增功能，不涉及修改现有需求）

## REMOVED Requirements

无
