const commandsCommand = require("../../src/bot/commands/commands");
const { EmbedBuilder } = require("discord.js");

describe("Comando /commands", () => {
  test("Should respond with an embed containing the list of commands.", async () => {
    const replyMock = jest.fn();

    const interactionMock = {
      reply: replyMock,
    };

    await commandsCommand.execute(interactionMock);

    expect(replyMock).toHaveBeenCalled();

    const replyArg = replyMock.mock.calls[0][0];

    expect(replyArg.embeds).toBeDefined();
    expect(replyArg.embeds.length).toBe(1);

    const embed = replyArg.embeds[0];

    expect(embed).toBeInstanceOf(EmbedBuilder);

    const embedJson = embed.toJSON();

    expect(embedJson.title).toBe("📘 Lista de Comandos");

    expect(embedJson.fields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "/ping" }),
        expect.objectContaining({ name: "/botinfo" }),
        expect.objectContaining({ name: "/quote <ticker>" }),
        expect.objectContaining({ name: "/commands" }),
      ]),
    );
  });
});
