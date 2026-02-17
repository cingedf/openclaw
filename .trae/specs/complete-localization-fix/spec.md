# 完成剩余汉化规格说明

## Why

之前的汉化任务未完全完成，以下内容仍为英文：

- Bot错误消息（7条）- 在 `bot-native-commands.ts` 中
- 启动提示词（90+条）- 在 `tagline.ts` 中
- 其他用户界面文本

用户要求同时修改源代码(src)和编译后文件(dist)，确保：

- 立即生效（dist文件）
- 持久生效（src文件，未来重新编译后仍有效）

## What Changes

- **修改**: `src/telegram/bot-native-commands.ts` - 7条错误消息汉化
- **修改**: `src/cli/tagline.ts` - 90+条启动提示词汉化
- **修改**: `dist/**/*.js` - 对应编译文件的同步汉化
- **安全原则**: 不翻译函数名、变量名、技术参数值（如"on"/"off"）

## Impact

- **受影响范围**: 用户可见的提示消息和启动标语
- **关键文件**:
  - `src/telegram/bot-native-commands.ts` - Bot错误消息源文件
  - `src/cli/tagline.ts` - 启动提示词源文件
  - `dist/**/*.js` - 所有编译后的JS文件

## ADDED Requirements

### Requirement: Bot错误消息汉化

系统应将所有用户可见的英文错误消息翻译为中文。

#### Scenario: Bot错误消息显示中文

- **GIVEN** 用户触发Bot错误
- **WHEN** Bot返回错误消息
- **THEN** 应显示中文错误消息，如：
  - "未生成回复，请重试。" (原: "No response generated. Please try again.")
  - "此群组已禁用。" (原: "This group is disabled.")
  - "您没有权限使用此命令。" (原: "You are not authorized to use this command.")

### Requirement: 启动提示词汉化

系统应将启动时显示的英文提示词翻译为中文。

#### Scenario: 启动显示中文提示词

- **GIVEN** 用户启动OpenClaw
- **WHEN** CLI显示启动标语
- **THEN** 应显示中文提示词，保留幽默风格

### Requirement: 双保险汉化

系统应同时修改源代码和编译后文件。

#### Scenario: 源代码和dist同步汉化

- **GIVEN** 汉化操作执行
- **WHEN** 修改源代码文件
- **THEN** 对应的dist文件也应同步修改
- **AND** 无需重新编译即可生效

## MODIFIED Requirements

无（此为新增功能，不涉及修改现有需求）

## REMOVED Requirements

无

## 安全汉化规则

1. **不翻译**: 函数名、变量名、类名
2. **不翻译**: 技术参数值（如"on"/"off"/"mention"/"always"）
3. **不翻译**: 命令名称本身（如/help、/status）
4. **不翻译**: ASCII艺术中的固定文本
5. **只翻译**: 用户可见的提示消息、描述文本
