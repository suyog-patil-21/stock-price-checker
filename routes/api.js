'use strict';
const StockPriceService = require('../service/stock_detail_service');
const responseBody = require('../utils/response-body');
module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const stock = req.query.stock;
      let like;
      if (req.query.like === undefined) {
        like = false;
      }
      const userIpAddress = req.ip;
      const isStockArrayReq = Array.isArray(stock);
      console.log(`REQUESTINFO\nip= ${userIpAddress},\nStock= ${stock},\nlike= ${like}`);
      if (isStockArrayReq) {
        // TODO : for multuple stock
        const stock1Result = await StockPriceService.fetchStock(stock[0]);
        const stock2Result = await StockPriceService.fetchStock(stock[1]);
        console.log(stock1Result);
        console.log(stock2Result);
        const responseData = [{ "stock": stock1Result.symbol, "price": stock1Result.latestPrice, "rel_likes": "1" },
        { "stock": stock2Result.symbol, "price": stock2Result.latestPrice, "rel_likes": "1" }];
        res.send(responseBody(responseData));
      }
      // TODO : for single stock
      const stockResult = await StockPriceService.fetchStock(stock);
      console.log(stockResult);
      res.send(responseBody({ "stock": stockResult.symbol, "price": stockResult.latestPrice, "likes": "1" }));
    });

};
