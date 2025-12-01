jest.mock("../../src/services/marketService.js", () => ({
  getQuote: jest.fn(),
}));

const stockCommand = require("../../src/bot/commands/quote.js");
const marketService = require("../../src/services/marketService.js");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("Stock Command", () => {
  test("Deve ter nome e descrição corretos", () => {
    expect(stockCommand.data.name).toBe("quote");
    expect(stockCommand.data.description).toBe(
      "Retorna cotação de uma ação B3.",
    );
  });

  test("Deve retornar a cotação corretamente", async () => {
    marketService.getQuote.mockResolvedValue({
      symbol: "PETR4",
    });

    const interaction = {
      options: {
        getString: jest.fn().mockReturnValue("PETR4"),
      },
      deferReply: jest.fn().mockResolvedValue(),
      editReply: jest.fn().mockResolvedValue(),
    };

    await stockCommand.execute(interaction);

    expect(interaction.deferReply).toHaveBeenCalled();
    expect(interaction.editReply).toHaveBeenCalledWith({
      content: expect.stringContaining("PETR4"),
    });
  });

  test("Deve retornar erro quando a API não encontra o ativo", async () => {
    marketService.getQuote.mockResolvedValue(null);

    const interaction = {
      options: {
        getString: jest.fn().mockReturnValue("XXXX"),
      },
      deferReply: jest.fn().mockResolvedValue(),
      editReply: jest.fn().mockResolvedValue(),
    };

    await stockCommand.execute(interaction);

    expect(interaction.editReply).toHaveBeenCalledWith({
      content: expect.stringContaining("Não foi possível encontrar cotação"),
    });
  });

  test("Deve tratar exceções internas", async () => {
    marketService.getQuote.mockRejectedValue(new Error("Falha na API"));

    const interaction = {
      options: {
        getString: jest.fn().mockReturnValue("PETR4"),
      },
      deferReply: jest.fn().mockResolvedValue(),
      editReply: jest.fn().mockResolvedValue(),
    };

    await stockCommand.execute(interaction);

    expect(interaction.editReply).toHaveBeenCalledWith({
      content: expect.stringContaining("Ocorreu um erro ao buscar a cotação"),
    });
  });
});
