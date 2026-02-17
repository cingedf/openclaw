# Add Google Gemini models to openclaw.json

$configPath = "C:\Users\Administrator\.openclaw\openclaw.json"

Write-Host "=== Adding Google Gemini Models ===" -ForegroundColor Cyan
Write-Host ""

# Read current config
$config = Get-Content $configPath -Raw | ConvertFrom-Json

# Define Google provider
$googleProvider = @{
    baseUrl = "https://generativelanguage.googleapis.com/v1beta"
    apiKey = "AIzaSyA44MoDs7jM2hPasMz3WAyWpSXjc9pyifE"
    api = "google-generative-ai"
    models = @(
        @{
            id = "gemini-2.5-flash"
            name = "Gemini-2.5-Flash"
            reasoning = $true
            input = @("text", "image")
            cost = @{ input = 0; output = 0 }
            contextWindow = 1000000
            maxTokens = 65536
        },
        @{
            id = "gemini-2.5-flash-lite"
            name = "Gemini-2.5-Flash-Lite"
            reasoning = $false
            input = @("text", "image")
            cost = @{ input = 0; output = 0 }
            contextWindow = 1000000
            maxTokens = 65536
        },
        @{
            id = "gemini-2.0-flash"
            name = "Gemini-2.0-Flash"
            reasoning = $false
            input = @("text", "image")
            cost = @{ input = 0; output = 0 }
            contextWindow = 1000000
            maxTokens = 8192
        },
        @{
            id = "gemini-embedding-001"
            name = "Gemini-Embedding-001"
            reasoning = $false
            input = @("text")
            cost = @{ input = 0; output = 0 }
            contextWindow = 2048
            maxTokens = 768
        }
    )
}

# Add google provider
$config.models.providers | Add-Member -MemberType NoteProperty -Name "google" -Value $googleProvider -Force

# Add new agents (speedy, translator, generalist, embedder)
$newAgents = @(
    @{
        id = "speedy"
        name = "快速助手"
        model = @{
            primary = "google/gemini-2.5-flash-lite"
            fallbacks = @("zai/glm-4-flash-250414")
        }
        tools = @{ profile = "messaging" }
        agentDir = "C:\Users\Administrator\.openclaw\agents\speedy\agent"
        workspace = "C:\Users\Administrator\.openclaw\workspace"
    },
    @{
        id = "translator"
        name = "翻译助手"
        model = @{
            primary = "google/gemini-2.5-flash"
            fallbacks = @("zai/glm-4-flash-250414")
        }
        tools = @{ profile = "messaging" }
        agentDir = "C:\Users\Administrator\.openclaw\agents\translator\agent"
        workspace = "C:\Users\Administrator\.openclaw\workspace"
    },
    @{
        id = "generalist"
        name = "通用助手"
        model = @{
            primary = "google/gemini-2.0-flash"
            fallbacks = @("zai/glm-4.7-flash")
        }
        tools = @{ profile = "messaging" }
        agentDir = "C:\Users\Administrator\.openclaw\agents\generalist\agent"
        workspace = "C:\Users\Administrator\.openclaw\workspace"
    },
    @{
        id = "embedder"
        name = "嵌入助手"
        model = @{
            primary = "google/gemini-embedding-001"
        }
        tools = @{ profile = "minimal" }
        agentDir = "C:\Users\Administrator\.openclaw\agents\embedder\agent"
        workspace = "C:\Users\Administrator\.openclaw\workspace"
    }
)

# Add new agents to list
foreach ($agent in $newAgents) {
    $existingAgent = $config.agents.list | Where-Object { $_.id -eq $agent.id }
    if (-not $existingAgent) {
        $config.agents.list += $agent
        Write-Host "  Added agent: $($agent.id)" -ForegroundColor Green
    } else {
        Write-Host "  Agent exists: $($agent.id)" -ForegroundColor Yellow
    }
}

# Add google models to defaults.models
$config.agents.defaults.models | Add-Member -MemberType NoteProperty -Name "google/gemini-2.5-flash" -Value @{} -Force
$config.agents.defaults.models | Add-Member -MemberType NoteProperty -Name "google/gemini-2.5-flash-lite" -Value @{} -Force
$config.agents.defaults.models | Add-Member -MemberType NoteProperty -Name "google/gemini-2.0-flash" -Value @{} -Force

# Save config
$configJson = $config | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($configPath, $configJson, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Added:" -ForegroundColor White
Write-Host "  - Google provider with 4 models" -ForegroundColor Green
Write-Host "  - 4 new agents (speedy, translator, generalist, embedder)" -ForegroundColor Green
Write-Host ""
Write-Host "Please restart OpenClaw to apply changes." -ForegroundColor Yellow
