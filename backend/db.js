const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kumarpurav59:puru__123@cluster0.f5dpn.mongodb.net/TODO", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema for Users
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  MobileNo: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }]
});

// Schema for Todos
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Models
const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { User, Todo };
