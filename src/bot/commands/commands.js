const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Mostra todos os comandos disponíveis do Stock Bot."),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Lista de Comandos")
      .setDescription(
        "Aqui estão todos os comandos disponíveis do **Stock-Bot**",
      )
      .setColor("#cfdd39")
      .addFields(
        {
          name: "/ping",
          value: "Verifica se o bot está online. Retorna **Pong!**",
          inline: false,
        },
        {
          name: "/botinfo",
          value: "Mostra informações básicas sobre o bot.",
          inline: false,
        },
        {
          name: "/quote <ticker>",
          value: "Retorna cotação de uma ação B3.",
          inline: false,
        },
        {
          name: "/summary <ticker>",
          value: "Retorna um resumo de uma ação B3.",
          inline: false,
        },
        {
          name: "/commands",
          value: "Lista todos os comandos do bot (este aqui).",
          inline: false,
        },
      )
      .setFooter({ text: "Stock-Bot © 2025" });

    await interaction.reply({ embeds: [embed] });
  },
};
