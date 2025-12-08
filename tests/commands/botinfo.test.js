const botinfoCommand = require("../../src/bot/commands/botinfo.js");

describe("Botinfo Command", () => {
  test("Should have the correct description.", () => {
    expect(botinfoCommand.data.description).toBe(
      "Mostra informações básicas sobre o bot.",
    );
  });

  test("Should reply with bot info.", async () => {
    const mockUser = {
      username: "Stock-Bot",
      id: "1234567890",
      createdAt: new Date("2024-01-01"),
    };

    const interaction = {
      client: { user: mockUser },
      reply: jest.fn().mockResolvedValue(),
    };

    await botinfoCommand.execute(interaction);

    expect(interaction.reply).toHaveBeenCalled();
    const reply = interaction.reply.mock.calls[0][0];
    expect(reply.embeds[0].data.title).toContain("Informações do Stock-Bot");
  });
});
