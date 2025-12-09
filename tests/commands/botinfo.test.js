const botinfoCommand = require("../../src/bot/commands/botinfo.js");

describe("Botinfo Command", () => {
  test("Should have the correct description.", () => {
    expect(botinfoCommand.data.description).toBe(
      "Mostra informações básicas sobre o bot.",
    );
  });

  test("Should reply with bot info.", async () => {
    const mockBannerURL = jest
      .fn()
      .mockReturnValue(
        "https://cdn.discordapp.com/banners/1234567890/banner.png",
      );

    const mockUser = {
      username: "Stock-Bot",
      id: "1234567890",
      createdAt: new Date("2024-01-01"),
      fetch: jest.fn().mockResolvedValue({
        bannerURL: mockBannerURL,
      }),
    };

    const interaction = {
      client: { user: mockUser },
      reply: jest.fn().mockResolvedValue(),
    };

    await botinfoCommand.execute(interaction);
    expect(mockUser.fetch).toHaveBeenCalledWith(true);
    expect(mockBannerURL).toHaveBeenCalledWith({
      size: 1024,
      format: "png",
      dynamic: true,
    });

    expect(interaction.reply).toHaveBeenCalled();

    const reply = interaction.reply.mock.calls[0][0];
    expect(reply.embeds[0].data.title).toContain("Informações do Stock-Bot");
    expect(reply.embeds[0].data.image.url).toBe(
      "https://cdn.discordapp.com/banners/1234567890/banner.png",
    );
  });
});
