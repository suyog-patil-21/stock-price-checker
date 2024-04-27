const mongoose = require('mongoose');
const userLikeInfoSchema = new mongoose.Schema({
    symbol:{
        type: String,
        required: true,
        uppercase:true
    },
    ipAddress:{
        type:String,
        required:true,
        unique:true
    },
});

const UserLikeInfoModel = new mongoose.model('stock-price-checker',userLikeInfoSchema);

module.exports = UserLikeInfoModel;