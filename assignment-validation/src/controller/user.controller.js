   const express = require("express");
   const { body, validationResult } = require("express-validator");
   const User = require("../modal/user.models");

   
   const router = express.Router();


   router.post("/", 
           body("first_Name")
           .trim()
           .not()
           .isEmpty()
           .withMessage("first name is not empty"),

           body("last_Name")
           .trim()
           .not()
           .isEmpty()
           .withMessage("last anme is not empty"),

           body("email")
           .trim()
           .isEmail()
           .custom( async (value)=>{
               const user = await User.findOne({email :value});
               if(user){
                   throw new Error("email is already taken");
               }
               return true;
           }),
            
           body("pincode")
           .trim()
           .not()
           .isEmpty()
           .withMessage("empty pincode is not reqired")
           .isNumeric()
           .withMessage(" digit numeric value is required")
           .custom(async (value)=>{
               if(value <6 || value > 6){
                   throw new Error("pincode mustbe 6 digit");
               }
               return true;
           }),

            body("age").trim()
            .not()
            .isEmpty()
            .withMessage("age must be required")
            .isNumeric()
            .withMessage("age must be numeric")
            .custom(async (value)=>{
                if(value<1 || value > 100){
                    throw new Error("invalid age");
                }
                return true;
            }),

            // body("gender")
            // .trim()
            // .not()
            // .isEmpty()
            // .withMessage("gender is required"),

         async (req,res) =>{
           try{

              const errors = validationResult(req);

              if(!errors.isEmpty()){
                return res.status(400).send({errors :errors.array() });
              }
               const user = await User.create(req.body);
              return res.status(201).send(user);
           }catch(err){
              return res.status(500).send({err: err.message});
           }
   });

   module.exports = router;

