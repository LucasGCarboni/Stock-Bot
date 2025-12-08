const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
} = require("../src/config/env");

// Valida variáveis obrigatórias
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
  console.error("❌ Erro: Variáveis de ambiente faltando:");
  console.error({
    DISCORD_TOKEN: !!DISCORD_TOKEN,
    DISCORD_CLIENT_ID: !!DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID: !!DISCORD_GUILD_ID,
  });
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, "../src/bot/commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.data?.toJSON) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`⚠️ Ignorando comando sem Slash: ${file}`);
  }
}

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log("🔄 Registrando slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
      { body: commands },
    );

    console.log("🚀 Comandos registrados com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao registrar comandos:", err);
  }
})();
