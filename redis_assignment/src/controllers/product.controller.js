const express = require("express");

const client  = require("../configs/redis");
const Product = require("../models/product.models");

const router = express.Router();

router.post("", async (req,res) =>{
    try{
    const produ = await Product.create(req.body);

    const produc = await Product.find().lean().exec();
    client.set("produc",JSON.stringify(produc));
    
    return res.status(201).send(produ);
    }catch(err){
       return res.status(500).send({message: err.message});     
    }
});

router.get("", async (req,res) =>{
    try{
     client.get("produc", async function (err, fechedproducts){
         if(fechedproducts){
             const produ = JSON.parse(fetchedproducts);
             return res.status(200).send({todos, redis:true});
         }else{
             try{
                const produc = await Product.find().lean().exec();
                client.set("produc", JSON.stringify(produc));
                return res.status(200).send({produc, redis :false});

             }catch(err){
                return res.status(200).send({message: err.message});   
             }
         }
     });   
    }catch(err){
       return res.status(500).send({message: err.message});     
    }
});

router.get("/:id", async (req,res) =>{
    try{
      client.get(`produc.${req.params.id}`, async function (err, fetchedproducts){
          if(fetchedproducts){
              const produ = JSON.parse(fetchedproducts);
              return res.status(200).send({produ, redis: true});

          }else{
              try{
                const produ = await Todo.findById(req.params.id).lean().exec();

                client.set(`produc.${req.params.id}`, JSON.stringify(produ));
      
                return res.status(200).send({ produ, redis: false });
              }catch(err){
                return res.status(500).send({ message: err.message }); 
              }  
          }
      }); 
    }catch(err){
       return res.status(500).send({message: err.message});     
    }
});

router.patch("/:id", async (req,res) =>{
    try {
        const produ = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
          .lean()
          .exec();
    
        const produc = await Product.find().lean().exec();
    
        client.set(`produc.${req.params.id}`, JSON.stringify(produ));
        client.set("produc", JSON.stringify(produc));
    
        return res.status(200).send(produ);
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
});

router.delete("/:id", async (req, res) => {
    try {
      const produ = await Product.findByIdAndDelete(req.params.id).lean().exec();
  
      const produc = await Product.find().lean().exec();
  
      client.del(`produc.${req.params.id}`);
      client.set("produc", JSON.stringify(produc));
  
      return res.status(200).send(produ);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

module.exports = router;