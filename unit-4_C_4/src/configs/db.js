const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "https://locamongodblhost:27017/cscorner"
  );
};

module.exports = connect;
