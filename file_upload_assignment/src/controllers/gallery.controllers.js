  const express = require("express");
  
  const Gallery = require("../models/gallery.models");
   const upload = require("../middlewares/uploads");

  const router = express.Router(); 

   router.post("", upload.single("title"), async (req, res)=>{
       try{
             const gallerys = await Gallery.create(
               {title : req.body.title}
             );
             return res.status(200).send(gallerys);
       }catch(err){
            return res.status(500).send({massege: err.massege});
       }
   });

   router.post("/multiple", upload.array("profile_pic", 5), async (req, res) => {
    try {
      const filePaths = req.files.map((file) => {
        return file.path;
      });
  
      const user = await Gallery.create({
        profile_pic: filePaths,
      });
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  module.exports = router;