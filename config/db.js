const mongoose = require('mongoose');

const MONGODB_URL = process.env.DB || "";

let db;

function connectDB(){
    mongoose.connect(MONGODB_URL);
    db = mongoose.connection;
    db.on('error',(err)=>{
        console.error(`Database connection Error: ${err}`);
    })
}

module.exports = {
    connectDB
}