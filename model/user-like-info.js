const mongoose = require('mongoose');
const userLikeInfoSchema = new mongoose.Schema({
    symbol:{
        type: String,
        required: true,
    },
    ipAddress:{
        required:true,
        type:String,
    },
});

const UserLikeInfoModel = new mongoose.model('stock-price-checker',userLikeInfoSchema);

module.exports = UserLikeInfoModel;