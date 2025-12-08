jest.mock("../../src/services/marketService.js", () => ({
  getFundamentals: jest.fn(),
}));

jest.mock("discord.js", () => ({
  SlashCommandBuilder: jest.fn().mockImplementation(() => ({
    setName: () => ({
      setDescription: () => ({
        addStringOption: () => ({}),
      }),
    }),
  })),
  EmbedBuilder: jest.fn().mockImplementation(() => ({
    setTitle: jest.fn().mockReturnThis(),
    setThumbnail: jest.fn().mockReturnThis(),
    setColor: jest.fn().mockReturnThis(),
    addFields: jest.fn().mockReturnThis(),
    setFooter: jest.fn().mockReturnThis(),
  })),
}));

const fundamentalsCommand = require("../../src/bot/commands/fundamentals.js");
const { getFundamentals } = require("../../src/services/marketService.js");

describe("Fundamentals Command", () => {
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

  test("Should reply with an embed when fundamentals data is valid", async () => {
    getFundamentals.mockResolvedValue({
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

    await fundamentalsCommand.execute(interaction);

    expect(interaction.editReply).toHaveBeenCalledWith(
      expect.objectContaining({
        embeds: expect.any(Array),
      }),
    );
  });

  test("Should warn the user when price is missing", async () => {
    getFundamentals.mockResolvedValue({
      longName: "Test Company",
      regularMarketPrice: null,
    });

    await fundamentalsCommand.execute(interaction);

    expect(interaction.editReply).toHaveBeenCalled();
  });

  test("Should handle API errors gracefully", async () => {
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    getFundamentals.mockRejectedValue(new Error("API Error"));

    await fundamentalsCommand.execute(interaction);

    expect(interaction.editReply).toHaveBeenCalledWith(
      expect.stringContaining("⚠️ Não consegui buscar os dados"),
    );
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
