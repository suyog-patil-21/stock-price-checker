'use strict';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const stock = req.query.stock;
      let like;
      if(req.query.like === undefined){
        like = false;
      }
      const userIpAddress = req.ip;
      const isStockArrayReq = Array.isArray(stock);
      console.log(`ip:${userIpAddress}\n,stock: ${stock}\n,like:${like}`);
      if(isStockArrayReq){
        // TODO : for multuple stock
      }
      // TODO : for single stock
    });
    
};
