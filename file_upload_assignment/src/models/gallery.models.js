const mongoose = require("mongoose"); 

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type : String, required :true
        },  
       user_id : {
           type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            requires : true,
         },  
    },
    {
        versionKey :false,
        timestamps :true,
    },
);

module.exports = mongoose.model("gallery", gallerySchema);