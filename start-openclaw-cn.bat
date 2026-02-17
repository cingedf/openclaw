@echo off
chcp 65001 >nul
cd /d "D:\openclaw-cn"
set OPENCLAW_CONFIG_DIR=C:\Users\Administrator\.openclaw
node openclaw.mjs gateway run
