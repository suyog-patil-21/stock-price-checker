// fetch to this url 
// https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/<symbolName>/quote
const axios = require('axios').default;

module.exports = class StockPriceService {

    static _generateUrlForStock(stockSymbol) {
        return 'https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/' + stockSymbol + '/quote';
    }

    static async fetchStock(stockSymbol) {
        const stockFetchUrl = this._generateUrlForStock(stockSymbol);
        try {
            const response = await axios.get(stockFetchUrl);
            if (response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            console.log(`Error in StockPriceService: Error->\n${err}`);
        }
        return null;
    }
}