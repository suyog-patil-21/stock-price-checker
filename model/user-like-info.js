const mongoose = require('mongoose');
const userLikeInfoSchema = new mongoose.Schema({
    symbol:{
        type: String,
        required: true
    },
    ipAddress:{
        required:true,
        type:String
    },
});

const userLikeInfoModel = new mongoose.Model('UserLike',userLikeInfoSchema);

module.exports = userLikeInfoModel;