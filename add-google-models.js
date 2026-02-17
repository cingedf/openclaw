const fs = require("fs");
const path = require("path");

const configPath = path.join(
  process.env.USERPROFILE || process.env.HOME,
  ".openclaw",
  "openclaw.json",
);

console.log("=== Adding Google Gemini Models ===\n");

try {
  const content = fs.readFileSync(configPath, "utf8");
  const config = JSON.parse(content);

  // Add Google provider
  if (!config.models.providers.google) {
    config.models.providers.google = {
      baseUrl: "https://generativelanguage.googleapis.com/v1beta",
      apiKey: "AIzaSyA44MoDs7jM2hPasMz3WAyWpSXjc9pyifE",
      api: "google-generative-ai",
      models: [
        {
          id: "gemini-2.5-flash",
          name: "Gemini-2.5-Flash",
          reasoning: true,
          input: ["text", "image"],
          contextWindow: 1000000,
          maxTokens: 65536,
        },
        {
          id: "gemini-2.5-flash-lite",
          name: "Gemini-2.5-Flash-Lite",
          input: ["text", "image"],
          contextWindow: 1000000,
          maxTokens: 65536,
        },
        {
          id: "gemini-2.0-flash",
          name: "Gemini-2.0-Flash",
          input: ["text", "image"],
          contextWindow: 1000000,
          maxTokens: 8192,
        },
        {
          id: "gemini-embedding-001",
          name: "Gemini-Embedding-001",
          input: ["text"],
          contextWindow: 2048,
          maxTokens: 768,
        },
      ],
    };
    console.log("Added Google provider with 4 models");
  } else {
    console.log("Google provider already exists");
  }

  // Add new agents
  const newAgents = [
    {
      id: "speedy",
      name: "快速助手",
      model: { primary: "google/gemini-2.5-flash-lite", fallbacks: ["zai/glm-4-flash-250414"] },
      tools: { profile: "messaging" },
    },
    {
      id: "translator",
      name: "翻译助手",
      model: { primary: "google/gemini-2.5-flash", fallbacks: ["zai/glm-4-flash-250414"] },
      tools: { profile: "messaging" },
    },
    {
      id: "generalist",
      name: "通用助手",
      model: { primary: "google/gemini-2.0-flash", fallbacks: ["zai/glm-4.7-flash"] },
      tools: { profile: "messaging" },
    },
    {
      id: "embedder",
      name: "嵌入助手",
      model: { primary: "google/gemini-embedding-001" },
      tools: { profile: "minimal" },
    },
  ];

  for (const agent of newAgents) {
    const exists = config.agents.list.find((a) => a.id === agent.id);
    if (!exists) {
      config.agents.list.push({
        ...agent,
        agentDir: path.join(
          process.env.USERPROFILE || process.env.HOME,
          ".openclaw",
          "agents",
          agent.id,
          "agent",
        ),
        workspace: path.join(process.env.USERPROFILE || process.env.HOME, ".openclaw", "workspace"),
      });
      console.log(`Added agent: ${agent.id}`);
    } else {
      console.log(`Agent exists: ${agent.id}`);
    }
  }

  // Add google models to defaults
  if (!config.agents.defaults.models) {
    config.agents.defaults.models = {};
  }
  config.agents.defaults.models["google/gemini-2.5-flash"] = {};
  config.agents.defaults.models["google/gemini-2.5-flash-lite"] = {};
  config.agents.defaults.models["google/gemini-2.0-flash"] = {};

  // Save
  fs.writeFileSync(configPath, JSON.stringify(config, null, 4), "utf8");
  console.log("\n=== Done ===");
  console.log("Please restart OpenClaw to apply changes.");
} catch (err) {
  console.error("Error:", err.message);
}
