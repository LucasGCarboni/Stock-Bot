const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getQuote } = require("../../services/marketService.js");
const logoService = require("../../services/logoService.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Retorna cotação de uma ação B3.")
    .addStringOption((option) =>
      option
        .setName("ticker")
        .setDescription("Símbolo da ação (ex: PETR4)")
        .setRequired(true),
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const symbol = interaction.options.getString("ticker").trim().toUpperCase();

    try {
      const ticker = await getQuote(symbol);

      if (!ticker || ticker.regularMarketPrice == null) {
        return interaction.editReply({
          content: `⚠️ Não foi possível encontrar cotação para **${symbol}**.`,
        });
      }

      const price = ticker.regularMarketPrice;
      const change = ticker.regularMarketChangePercent;
      const logoUrl = await logoService.resolveLogo(ticker);
      const changeArrow = change >= 0 ? "▲" : "▼";
      const color = change >= 0 ? 0x00c853 : 0xd32f2f;

      const embed = new EmbedBuilder()
        .setTitle(`${ticker.shortName || symbol} (${symbol})`)
        .setColor(color)
        .addFields(
          {
            name: "Preço",
            value: `R$ ${price.toFixed(2)}`,
            inline: true,
          },
          {
            name: "Variação",
            value: `${changeArrow} ${change.toFixed(2)}%`,
            inline: true,
          },
        )
        .setTimestamp(new Date(ticker.regularMarketTime));

      if (logoUrl) embed.setThumbnail(logoUrl);

      return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error("Erro ao buscar cotação:", err);
      return interaction.editReply({
        content: `⚠️ Não consegui buscar os dados. Verifique o ticker e tente novamente.`,
      });
    }
  },
};
