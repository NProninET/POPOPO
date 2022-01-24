const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  color: {type: String, default: "#FF00FF"}
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
