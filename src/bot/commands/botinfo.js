const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Mostra informações básicas sobre o bot."),

  async execute(interaction) {
    const botUser = interaction.client.user;

    const embed = new EmbedBuilder()
      .setTitle("Informações do Stock-Bot")
      .setColor("#cfdd39")
      .addFields(
        { name: "Nome", value: botUser.username, inline: true },
        { name: "ID", value: botUser.id, inline: true },
        {
          name: "Criado em",
          value: botUser.createdAt.toLocaleDateString("pt-BR"),
          inline: false,
        },
      );

    await interaction.reply({ embeds: [embed] });
  },
};
