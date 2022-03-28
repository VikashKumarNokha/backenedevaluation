const express = require("express");

const usersController = require("./controllers/user.controllers");
const todosController = require("./controllers/todo.controllers");

const app = express();

app.use(express.json());


app.use("/users", usersController); 
app.use("/todos", todosController);

module.exports = app;