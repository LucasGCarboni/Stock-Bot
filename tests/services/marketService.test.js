// tests/services/marketService.test.js
jest.mock("brapi"); // mock do módulo antes de tudo

const Brapi = require("brapi");

// Criamos aqui a instância que o service deve usar
const mockRetrieve = jest.fn();

Brapi.mockImplementation(() => ({
  quote: {
    retrieve: mockRetrieve,
  },
}));

const { getQuote } = require("../../src/services/marketService");

describe("getQuote", () => {
  beforeEach(() => {
    mockRetrieve.mockReset();
  });

  test("Should return the stock data correctly.", async () => {
    const mockResponse = {
      results: [{ ticker: "PETR4", price: 35.22 }],
    };

    mockRetrieve.mockResolvedValue(mockResponse);

    const result = await getQuote("PETR4");

    expect(result).toEqual(mockResponse.results[0]);
    expect(mockRetrieve).toHaveBeenCalledWith("PETR4");
  });

  test("Should throw an error when the ticker is not found.", async () => {
    mockRetrieve.mockResolvedValue({ results: [] });

    await expect(getQuote("XXXX")).rejects.toThrow(
      "No results found for ticker: XXXX",
    );
  });
});
