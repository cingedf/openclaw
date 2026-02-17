# 完成剩余汉化任务列表

## 任务1: 汉化Bot错误消息（源代码）

- [ ] 修改 `src/telegram/bot-native-commands.ts`
  - [ ] "No response generated. Please try again." → "未生成回复，请重试。"
  - [ ] "This group is disabled." → "此群组已禁用。"
  - [ ] "This topic is disabled." → "此话题已禁用。"
  - [ ] "You are not authorized to use this command." → "您没有权限使用此命令。"
  - [ ] "Telegram group commands are disabled." → "Telegram群组命令已禁用。"
  - [ ] "This group is not allowed." → "此群组未被允许。"
  - [ ] "Command not found." → "未找到命令。"

## 任务2: 汉化其他平台错误消息（源代码）

- [ ] 修改 `src/discord/monitor/native-command.ts` - Discord错误消息
- [ ] 修改 `src/discord/monitor/exec-approvals.ts` - Discord执行审批消息
- [ ] 修改 `src/discord/monitor/agent-components.ts` - Discord代理组件消息
- [ ] 修改 `src/slack/monitor/slash.ts` - Slack斜杠命令消息

## 任务3: 汉化启动提示词（源代码）

- [ ] 修改 `src/cli/tagline.ts`
  - [ ] DEFAULT_TAGLINE → "所有聊天，一个OpenClaw。"
  - [ ] 翻译90+条TAGLINES数组内容
  - [ ] 翻译11条节日消息HOLIDAY_TAGLINES

## 任务4: 同步汉化编译文件（dist）

- [ ] 修改 `dist/**/*.js` 中的对应消息
  - [ ] 使用文本替换确保与源代码一致
  - [ ] 验证dist文件中无残留英文消息

## 任务5: 验证汉化结果

- [ ] 检查源代码汉化完整性
- [ ] 检查dist文件汉化完整性
- [ ] 确保无函数名/变量名被误翻译

# 任务依赖

- 任务1、2、3可并行执行
- 任务4依赖于任务1、2、3完成
- 任务5依赖于任务4完成
