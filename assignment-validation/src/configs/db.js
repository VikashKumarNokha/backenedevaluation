const mongoose = require("mongoose");

module.exports = () =>{
    return mongoose.connect(
        "https://locamongodblhost:27017/cscorner");
};