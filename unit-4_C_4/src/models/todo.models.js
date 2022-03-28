const mongoose = require("mongoose");

//   todo schema
const todosSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  );

// Step 2 : creating the model
const Todo = mongoose.model("todo", todosSchema); // user => users

module.exports = Todo;