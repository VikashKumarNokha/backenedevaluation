
const express = require("express");


const Todo = require("../models/todo.models");

const crudController = require("./crud.controllers");

const router = express.Router();

// Todo CRUD
router.get("", async (req, res) => {
  try {
    const todos = await Todo.find()
      
      .populate({
        path: "userId",
        select: { firstName: 1, email: 1, _id: 0 },
      })
      .lean()
      .exec();

    return res.status(200).send(todos);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", crudController.post(Todo));

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
      .populate({ path: "userId", select: ["email"] })
      .lean()
      .exec();

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", crudController.deleteOne(Todo));



module.exports = router;