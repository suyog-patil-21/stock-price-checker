const { Mongoose } = require('mongoose');
const UserLikeInfoModel = require('../model/user-like-info.model')

const mongoose = new Mongoose();

module.exports = class UserLikeInfoDAO {
    async getUserLikeInfoCountByStockSymbol(symbol) {
        try {
            const userLikeInfo = await UserLikeInfoModel.countDocuments({ symbol });
            return userLikeInfo;
        } catch (err) {
            console.log(`Error in UserLikeInfoDAO getUserLikeInfoCountByStockSymbol(): \n${err}`);
        }
    }

    async getUserLikeInfoDataBySymbolAndHash(symbol, ipHash) {
        try {
            const userLikeInfo = await UserLikeInfoModel.findOne({ "symbol": symbol, "ipAddress": ipHash });
            return userLikeInfo;
        } catch (err) {
            console.log(`Error in UserLikeInfoDAO getUserLikeInfoDataBySymbolAndHash(): \n${err}`);
        }
    }

    async createUserLikeInfo(symbol, ipHash) {
        try {
            const userLikeInfo = await new UserLikeInfoModel({ symbol, ipAddress: ipHash });
            return await userLikeInfo.save();
        } catch (err) {
            console.log(`Error in UserLikeInfoDAO createUserLikeInfo(): \n${err}`);
        }
    }
}