const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
} = require("../src/config/env");

const commands = [];
const commandsPath = path.join(__dirname, "../src/bot/commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registrando slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
      { body: commands },
    );

    console.log("Comandos registrados com sucesso!");
  } catch (err) {
    console.error(err);
  }
})();
