const { Brapi } = require("brapi");
const { BRAPI_API_KEY } = require("../config/env.js");

const client = new Brapi({
  apiKey: BRAPI_API_KEY,
});

async function getQuote(ticker) {
  const response = await client.quote.retrieve(ticker);
  const result = response.results?.[0];

  if (!result) {
    throw new Error(`No results found for ticker: ${ticker}`);
  }

  return result;
}

async function getSummary(ticker) {
  const response = await client.quote.retrieve(ticker, {
    modules: "summaryProfile",
  });
  const result = response?.results?.[0];

  if (!result) {
    throw new Error(`No results found for ticker: ${ticker}`);
  }
  return result;
}

module.exports = { getQuote, getSummary };
