const pingCommand = require("../../src/bot/commands/ping.js");

describe("Ping Command", () => {
  test("Should reply with Pong!", async () => {
    const interaction = {
      reply: jest.fn().mockResolvedValue(),
    };

    await pingCommand.execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith("🏓 Pong!");
  });

  test("Command data should have correct name and description.", () => {
    expect(pingCommand.data.name).toBe("ping");
    expect(pingCommand.data.description).toBe("Retorna Pong!");
  });
});
