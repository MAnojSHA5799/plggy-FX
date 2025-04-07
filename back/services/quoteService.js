const axios = require('axios');
const cheerio = require('cheerio');

// Dummy data for simplicity
const sources = [
  {
    source: "https://www.ambito.com/contenidos/dolar.html",
    fetch: async () => ({
      buy_price: 140.3 + Math.random(),
      sell_price: 144 + Math.random(),
      source: "https://www.ambito.com/contenidos/dolar.html"
    })
  },
  // Add other 2 sources similarly
];

const fetchAllQuotes = async () => {
  const results = await Promise.all(sources.map(src => src.fetch()));
  return results;
};

module.exports = { fetchAllQuotes };
