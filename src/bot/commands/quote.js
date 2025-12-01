const { SlashCommandBuilder } = require("discord.js");
const { getQuote } = require("../../services/marketService.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Retorna cotação de uma ação B3.")
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("Símbolo da ação (ex: PETR4)")
        .setRequired(true),
    ),

  async execute(interaction) {
    const ticker = interaction.options.getString("symbol").trim().toUpperCase();

    await interaction.deferReply();

    try {
      const quote = await getQuote(ticker);

      if (!quote || quote.regularMarketPrice == null) {
        return interaction.editReply({
          content: `Não foi possível encontrar cotação para o símbolo **${ticker}**.`,
        });
      }

      const price = quote.regularMarketPrice;
      const change = quote.regularMarketChangePercent;
      const arrow = change >= 0 ? "🟢" : "🔴";

      const replyMessage = `**${ticker}**
Preço: R$ ${price.toFixed(2)}
Variação: ${arrow} ${change.toFixed(2)}%`;

      await interaction.editReply({ content: replyMessage });
    } catch (err) {
      console.error("Erro ao buscar cotação:", err);
      await interaction.editReply({
        content: `Ocorreu um erro ao buscar a cotação para **${ticker}**. Tente novamente mais tarde.`,
      });
    }
  },
};
