# OpenClaw 计划任务(Cron)启动流程梳理

## 启动流程概览

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        OpenClaw Gateway 启动流程                              │
└─────────────────────────────────────────────────────────────────────────────┘

1. 网关服务器启动 (server.impl.ts)
   │
   ├─► 构建Cron服务 (buildGatewayCronService)
   │   │
   │   ├─► 解析Cron存储路径 (resolveCronStorePath)
   │   │   └─► 默认路径: ~/.openclaw/cron/jobs.json
   │   │
   │   ├─► 检查Cron是否启用
   │   │   ├─► 环境变量 OPENCLAW_SKIP_CRON !== "1"
   │   │   └─► 配置文件 cron.enabled !== false
   │   │
   │
```
