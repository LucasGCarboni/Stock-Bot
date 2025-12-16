const axios = require("axios");
const { BRANDFETCH_API_KEY, LOGODEV_SECRET_API_KEY } = require("../config/env");

const logoCache = new Map();

class LogoService {
  constructor() {
    this.brandfetchKey = BRANDFETCH_API_KEY;
    this.logoDevToken = LOGODEV_SECRET_API_KEY;
  }

  /**
  @param {Object} stockData 
  @returns {Promise<string|null>}
   */

  async resolveLogo(stockData) {
    const { symbol, logourl, longName } = stockData;
    if (
      logourl &&
      logourl.startsWith("http") &&
      !logourl.toLowerCase().endsWith(".svg")
    ) {
      return logourl;
    }

    if (logoCache.has(symbol)) {
      return logoCache.get(symbol);
    }

    console.log(
      `[LogoService] Buscando logo externa para: ${symbol} (${longName})`,
    );
    let externalLogo = null;

    if (this.brandfetchKey && longName) {
      try {
        const legalSuffixes =
          /( S\.?A\.?| S\/A| S\.?A\.R\.L\.?| S\.?L\.?| LTDA?\.?| INC\.?| CORP\.?| CORPORATION| Corporation| COMPANY| CO\.?| PLC| N\.?V\.?| A\.?G\.?| LDA| PTY| LTD| CORP| AB| OY| SE)/gi;

        const commonPrefixes = /(^(THE|O|A)\s+)/i;

        let cleanName = longName;

        cleanName = cleanName.replace(legalSuffixes, "").trim();
        cleanName = cleanName.replace(commonPrefixes, "").trim();
        if (!cleanName) {
          console.warn(
            `[LogoService] Nome limpo vazio após remoção de prefixos/sufixos para ${longName}.`,
          );
          return null;
        }

        const response = await axios.get(
          `https://api.brandfetch.io/v2/search/${encodeURIComponent(cleanName)}`,
          {
            headers: { Authorization: `Bearer ${this.brandfetchKey}` },
          },
        );

        if (response.data && response.data.length > 0) {
          externalLogo = response.data[0].icon;
        }
      } catch (error) {
        console.warn(
          `[LogoService] Brandfetch erro para ${longName}: ${error.message}`,
        );
      }
    }

    if (!externalLogo && this.logoDevToken && symbol) {
      try {
        const domainGuess = `${symbol.replace(/\W/g, "").toLowerCase()}.com`;

        const logoDevUrl = `https://img.logo.dev/${domainGuess}?token=${this.logoDevToken}`;

        const head = await axios.head(logoDevUrl);
        if (head.status === 200) {
          externalLogo = logoDevUrl;
        }
      } catch (error) {
        console.warn(
          `[LogoService] Logo.dev erro para ${symbol}: ${error.message}`,
        );
      }
    }

    if (externalLogo) {
      logoCache.set(symbol, externalLogo);
    }
    return externalLogo;
  }
}

module.exports = new LogoService();
