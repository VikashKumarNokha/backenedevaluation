const express = "express";

   const usercontroller = require("../controller/user.controller");


 const app = express();

 app.use(express.json());

app.use("/users",usercontroller);

module.exports = app;