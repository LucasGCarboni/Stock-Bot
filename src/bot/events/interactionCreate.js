const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    if (!client.commands) {
      client.commands = new Collection();

      const commandsPath = path.join(__dirname, "../commands");
      const commandFiles = fs.readdirSync(commandsPath);

      for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        client.commands.set(command.data.name, command);
      }
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "Ocorreu um erro ao executar este comando!",
        ephemeral: true,
      });
    }
  },
};
