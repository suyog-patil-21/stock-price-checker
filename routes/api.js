'use strict';
const StockPriceService = require('../service/stock-detail.service');
const responseBody = require('../utils/response-body');
const UserLikeInfoService = require('../service/user-like-info.service')

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const stock = req.query.stock;
      let like = (req.query.like === 'true') ? true : false;
      const userIpAddress = req.ip;
      const isStockArrayReq = Array.isArray(stock);

      const _userLikeInfoService = new UserLikeInfoService();

      if (isStockArrayReq) {
        // For multuple stock query
        const stock1Result = await StockPriceService.fetchStock(stock[0]);
        const stock2Result = await StockPriceService.fetchStock(stock[1]);
        if (like) {
          await _userLikeInfoService.createUserLikeInfo(stock[0], userIpAddress);
          await _userLikeInfoService.createUserLikeInfo(stock[1], userIpAddress);
        }
        const stock1likes = await _userLikeInfoService.getStockLikeCount(stock[0]);
        const stock2likes = await _userLikeInfoService.getStockLikeCount(stock[1]);
        const responseData = [
          { stock: stock1Result.symbol, price: stock1Result.latestPrice, rel_likes: (stock1likes - stock2likes) },
          { stock: stock2Result.symbol, price: stock2Result.latestPrice, rel_likes: (stock2likes - stock1likes) }
        ];
        return res.send(responseBody(responseData));
      }

      // For single stock query
      const stockResult = await StockPriceService.fetchStock(stock);
      if (like) {
        await _userLikeInfoService.createUserLikeInfo(stock, userIpAddress);
      }
      const userlikes = await _userLikeInfoService.getStockLikeCount(stock);
      return res.send(responseBody({ stock: stockResult.symbol, price: stockResult.latestPrice, likes: userlikes }));
    });

};
