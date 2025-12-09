const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getFundamentals } = require("../../services/marketService");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fundamentals")
    .setDescription("Mostra indicadores fundamentalistas completos de uma ação")
    .addStringOption((option) =>
      option.setName("symbol").setDescription("Ex: PETR4").setRequired(true),
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const symbol = interaction.options.getString("symbol").trim().toUpperCase();

    try {
      const ticker = await getFundamentals(symbol);
      const change = ticker.regularMarketChangePercent;
      const color = change >= 0 ? 0x00c853 : 0xd32f2f;

      const embed = new EmbedBuilder()
        .setTitle(
          `${ticker.longName} (${symbol}) - Indicadores Fundamentalistas`,
        )
        .setColor(color)
        .addFields(
          {
            name: "Preço",
            value: ticker.regularMarketPrice
              ? `R$ ${ticker.regularMarketPrice.toFixed(2)}`
              : "–",
            inline: true,
          },
          {
            name: "Preço/Lucro (P/L)",
            value: ticker.priceEarnings ? ticker.priceEarnings.toFixed(2) : "–",
            inline: true,
          },
          {
            name: "Market Cap",
            value: ticker.marketCap
              ? `R$ ${(ticker.marketCap / 1e9).toFixed(2)} Bi`
              : "–",
            inline: true,
          },
          {
            name: "Industry",
            value: ticker.summaryProfile?.industry || "–",
            inline: false,
          },
          {
            name: "Summary",
            value:
              ticker.summaryProfile?.longBusinessSummary?.slice(0, 1024) || "–",
            inline: false,
          },
          {
            name: "Employees",
            value: ticker.summaryProfile?.fullTimeEmployees
              ? ticker.summaryProfile.fullTimeEmployees.toString()
              : "–",
            inline: false,
          },
          {
            name: "Website",
            value: ticker.summaryProfile?.website || "–",
            inline: false,
          },
        );

      return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return interaction.editReply(
        "⚠️ Não consegui buscar os dados. Verifique o ticker e tente novamente.",
      );
    }
  },
};
