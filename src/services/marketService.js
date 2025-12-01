const Brapi = require("brapi");
const { BRAPI_API_KEY } = require("../config/env");

const client = new Brapi({
  apiKey: BRAPI_API_KEY,
});

async function getQuote(ticker) {
  const response = await client.quote.retrieve(ticker);
  return response.results[0];
}

module.exports = { getQuote };
