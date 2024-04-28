const UserLikeInfoDAO = require('../data/user-like-info.data');
const HashingService = require("./hashing.service");

module.exports = class UserLikeInfoService {
    constructor() {
        this._userLikeInfoDAO = new UserLikeInfoDAO();
    }

    async createUserLikeInfo(symbol, ipAddress) {
        try {
            const ipHash = await HashingService.getHash(ipAddress);
            const result = await this._userLikeInfoDAO.getUserLikeInfoDataBySymbolAndHash(symbol, ipHash);
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

    async deleteUserLikeInfoByIpHash(ipHash) {
        try {
            await this._userLikeInfoDAO.deleteUserLikeInfoByIpHash(ipHash);
        } catch (err) {
            console.log(`Error in UserLikeInfoService deleteUserLikeInfoByIpHash(): \n${err}`);
        }
    }
}