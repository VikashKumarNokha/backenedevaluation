const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      first_Name :{type : String, required : true },
      last_Name : {type : String , reuired :true},
       pincode :{type :Number, reuired : true},
       email :{type : String, required : true},
       age :{type : Number, required : true},
       gender :{type :String ,
        enum:["Male", "Female","Others"],
         default :"Male",
        },
    },
    {
        versionKey : false,
        timestamps:true,

    },
);

  module.exports = mongoose.model("user", userSchema);