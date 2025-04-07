const { fetchAllQuotes } = require('../services/quoteService');
const cache = require('../cache/cache');

const getQuotes = async (req, res) => {
  const cached = cache.get('quotes');
  if (cached) return res.json(cached);

  const data = await fetchAllQuotes();
  cache.set('quotes', data);
  res.json(data);
};

const getAverage = async (req, res) => {
  const quotes = cache.get('quotes') || await fetchAllQuotes();
  const avg = {
    average_buy_price: +(quotes.reduce((acc, q) => acc + q.buy_price, 0) / quotes.length).toFixed(2),
    average_sell_price: +(quotes.reduce((acc, q) => acc + q.sell_price, 0) / quotes.length).toFixed(2)
  };
  res.json(avg);
};

const getSlippage = async (req, res) => {
  const quotes = cache.get('quotes') || await fetchAllQuotes();
  const avgBuy = quotes.reduce((acc, q) => acc + q.buy_price, 0) / quotes.length;
  const avgSell = quotes.reduce((acc, q) => acc + q.sell_price, 0) / quotes.length;

  const slippage = quotes.map(q => ({
    source: q.source,
    buy_price_slippage: +((q.buy_price - avgBuy) / avgBuy).toFixed(4),
    sell_price_slippage: +((q.sell_price - avgSell) / avgSell).toFixed(4)
  }));

  res.json(slippage);
};

module.exports = { getQuotes, getAverage, getSlippage };
