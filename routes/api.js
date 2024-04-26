'use strict';
const StockPriceService = require('../service/stock_detail_service');
const responseBody = require('../utils/response-body');
const UserLikeInfoDAO = require('../data/user-like-info.data')

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const stock = req.query.stock;
      let like = req.query.like || false;
      const userIpAddress = req.ip;
      const isStockArrayReq = Array.isArray(stock);
      console.log(`REQUESTINFO\nip= ${userIpAddress},\nStock= ${stock},\nlike= ${like}`);
      const _userLikeInfoDAO = new UserLikeInfoDAO();
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
      // const userlikes = await _userLikeInfoDAO.getUserLikeInfoDataBySymbolAndHash(stock,userIpAddress);
      // console.log(`user likes from DB = ${userlikes}`);
      if(like){
        console.log("inside the logic code");
        const createUserLikeInfo = await _userLikeInfoDAO.createUserLikeInfo(symbol,userIpAddress);
        console.log(createUserLikeInfo);
      }
      res.send(responseBody({ "stock": stockResult.symbol, "price": stockResult.latestPrice, "likes": "userlikes" }));
    });

};
