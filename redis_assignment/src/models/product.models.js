const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name:{type: String, required : true},
   title: {type: String , required :true},
   price:{type:Number},
});

module.exports = mongoose.model("product", productSchema); 