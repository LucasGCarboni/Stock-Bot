// Corrige o caminho do mock
jest.mock("../../src/services/marketService.js", () => ({
  getSummary: jest.fn(), // Mudou de getFundamentals para getSummary
}));

jest.mock("discord.js", () => ({
  SlashCommandBuilder: jest.fn().mockImplementation(() => ({
    setName: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    addStringOption: jest.fn().mockReturnThis(),
  })),
  EmbedBuilder: jest.fn().mockImplementation(() => ({
    setTitle: jest.fn().mockReturnThis(),
    setThumbnail: jest.fn().mockReturnThis(),
    setColor: jest.fn().mockReturnThis(),
    addFields: jest.fn().mockReturnThis(),
    setFooter: jest.fn().mockReturnThis(),
  })),
}));

// Atualiza o caminho do comando
const summaryCommand = require("../../src/bot/commands/summary.js");
const { getSummary } = require("../../src/services/marketService.js");

describe("Summary Command", () => {
  // Mudou o nome do describe
  let interaction;

  beforeEach(() => {
    interaction = {
      deferReply: jest.fn(),
      editReply: jest.fn(),
      options: {
        getString: jest.fn().mockReturnValue("PETR4"),
      },
    };
    jest.clearAllMocks();
  });

  test("Should reply with an embed when summary data is valid", async () => {
    getSummary.mockResolvedValue({
      longName: "Petrobras PN",
      regularMarketPrice: 38.5,
      regularMarketChangePercent: 1.23,
      priceEarnings: 12.34,
      marketCap: 503100000000,
      summaryProfile: {
        industry: "Oil & Gas",
        longBusinessSummary: "Energy sector company.",
        fullTimeEmployees: 45000,
        website: "https://petrobras.com.br",
      },
      logo: "https://icons.brapi.dev/logos/PETR4.png",
    });

    await summaryCommand.execute(interaction);

    expect(interaction.deferReply).toHaveBeenCalled();
    expect(interaction.editReply).toHaveBeenCalledWith(
      expect.objectContaining({
        embeds: expect.any(Array),
      }),
    );
  });

  test("Should warn the user when price is missing", async () => {
    getSummary.mockResolvedValue({
      longName: "Test Company",
      regularMarketPrice: null,
    });

    await summaryCommand.execute(interaction);

    expect(interaction.deferReply).toHaveBeenCalled();
    expect(interaction.editReply).toHaveBeenCalled();
  });

  test("Should handle API errors gracefully", async () => {
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    getSummary.mockRejectedValue(new Error("API Error"));

    await summaryCommand.execute(interaction);

    expect(interaction.deferReply).toHaveBeenCalled();
    expect(interaction.editReply).toHaveBeenCalledWith(
      expect.stringContaining("⚠️ Não consegui buscar os dados"),
    );
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
