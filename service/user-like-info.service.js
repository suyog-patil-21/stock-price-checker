const UserLikeInfoDAO = require('../data/user-like-info.data');

module.exports = class UserLikeInfoService {
    constructor() {
        this._userLikeInfoDAO = new UserLikeInfoDAO();
    }

    async createUserLikeInfo(symbol, ipHash) {
        try {
            const result = await this._userLikeInfoDAO.getUserLikeInfoDataBySymbolAndHash(symbol, ipHash);
            console.log(result);
            if (result === null) {
                return await this._userLikeInfoDAO.createUserLikeInfo(symbol, ipHash);
            }
        } catch (err) {
            console.log(`Error in UserLikeInfoService createUserLikeInfo(): \n${err}`)
        }
    }

    async getStockLikeCount(symbol) {
        try {
            return await this._userLikeInfoDAO.getUserLikeInfoCountByStockSymbol(symbol);
        } catch (err) {
            console.log(`Error in UserLikeInfoService getStockLikeCount(): \n${err}`)
        }
    }
}