# OpenClaw-CN 项目规则

## 一、核心原则

- **目标**：减少内存/CPU/IO占用，增加连接可靠性
- **优先级**：内存 > CPU > IO > 连接
- **方式**：源代码直接优化，避免新建文件，自动化执行

## 二、使用环境

- 场景：单人Telegram bot，低并发
- 网络：国内环境，代理127.0.0.1:7897，只国产LLM直连
- 系统：Windows 10 x64

## 三、开发规范

- 临时文件用后删除
- 同步原则：无损同步、官方优先、保留中文定制
- 执行流程：检查依赖 → 默认启用 → 移除依赖 → 自动生效

## 四、权限处理

```powershell
Add-Content -Path "路径" -Value $content -Encoding UTF8
[System.IO.File]::WriteAllText("路径", $content, [System.Text.Encoding]::UTF8)
```

## 五、Git同步

```
origin: cingedf/openclaw (fork)
upstream: openclaw/openclaw (官方)

$env:HTTP_PROXY = "http://127.0.0.1:7897"
gh repo sync cingedf/openclaw --source openclaw/openclaw
git fetch upstream && git merge upstream/main
```

## 六、检查清单

- 执行前：理解意图 → 评估新建文件 → 提供选项利弊及推荐
- 执行后：构建成功 → 功能正常 → 删除临时文件 → 更新文档

## 七、汉化任务

安全汉化（不汉化安装、函数），源代码和dist同时修改。
