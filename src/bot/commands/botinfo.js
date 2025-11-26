const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Mostra informações básicas sobre o bot."),

  async execute(interaction) {
    const botUser = interaction.client.user;

    await interaction.reply({
      content: `🤖 **Informações do Bot**
• Nome: ${botUser.username}
• ID: ${botUser.id}
• Criado em: ${botUser.createdAt.toLocaleDateString("pt-BR")}
`,
    });
  },
};
