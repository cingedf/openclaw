Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "D:\openclaw-cn"
WshShell.Run "cmd /c set OPENCLAW_CONFIG_DIR=C:\Users\Administrator\.openclaw && node openclaw.mjs gateway run", 0, False
Set WshShell = Nothing
