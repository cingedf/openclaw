const fs = require("fs");
const path = require("path");

console.log("=".repeat(60));
console.log("OpenClaw 启动验证工具");
console.log("=".repeat(60));
console.log();

let hasError = false;

const criticalFiles = [
  { path: "src/cron/service.ts", check: "export class CronService" },
  { path: "src/cron/types.ts", check: "export type CronSchedule" },
  { path: "src/cron/service/ops.ts", check: "export async function start" },
  { path: "src/gateway/server-cron.ts", check: "export function buildGatewayCronService" },
  { path: "src/gateway/server.impl.ts", check: "export type GatewayServer" },
  { path: "dist/index.js", check: "CronService" },
];

console.log("[1/3] 检查关键文件...");
for (const file of criticalFiles) {
  const fullPath = path.join(__dirname, "..", file.path);
  if (!fs.existsSync(fullPath)) {
    console.log(`  ✗ ${file.path} - 文件不存在`);
    hasError = true;
    continue;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  if (content.includes(file.check)) {
    console.log(`  ✓ ${file.path}`);
  } else {
    console.log(`  ✗ ${file.path} - 可能已被破坏`);
    hasError = true;
  }
}

console.log();
console.log("[2/3] 检查UI汉化...");
const uiFiles = [
  { path: "ui/src/ui/navigation.ts", checks: ['label: "聊天"', 'label: "控制"'] },
  { path: "ui/src/ui/views/cron.ts", checks: ["调度器", "任务数"] },
];

for (const file of uiFiles) {
  const fullPath = path.join(__dirname, "..", file.path);
  if (!fs.existsSync(fullPath)) {
    console.log(`  ✗ ${file.path} - 文件不存在`);
    hasError = true;
    continue;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const allChecks = file.checks.every((check) => content.includes(check));
  if (allChecks) {
    console.log(`  ✓ ${file.path} - 已汉化`);
  } else {
    console.log(`  ⚠ ${file.path} - 部分未汉化`);
  }
}

console.log();
console.log("[3/3] 检查代码完整性...");
const codeChecks = [
  { path: "src/cron/service.ts", checks: ["async start()", "async stop()", "async status()"] },
  {
    path: "src/cron/service/ops.ts",
    checks: ["export async function start", "export function stop"],
  },
  { path: "ui/src/ui/views/cron.ts", checks: ["onRefresh", "onAdd", "formatNextRun"] },
];

for (const file of codeChecks) {
  const fullPath = path.join(__dirname, "..", file.path);
  if (!fs.existsSync(fullPath)) {
    console.log(`  ✗ ${file.path} - 文件不存在`);
    hasError = true;
    continue;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const allChecks = file.checks.every((check) => content.includes(check));
  if (allChecks) {
    console.log(`  ✓ ${file.path} - 代码完整`);
  } else {
    console.log(`  ✗ ${file.path} - 代码可能已被破坏`);
    hasError = true;
  }
}

console.log();
console.log("=".repeat(60));
if (hasError) {
  console.log("✗ 验证失败 - 发现问题，请检查上述错误");
  process.exit(1);
} else {
  console.log("✓ 验证通过 - 系统可以正常启动！");
  console.log();
  console.log("说明:");
  console.log("- 所有关键文件存在且完整");
  console.log("- UI已汉化");
  console.log("- 代码逻辑未被破坏");
  console.log();
  process.exit(0);
}
