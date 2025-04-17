const express = require("express");
const app = express();
const cors = require("cors");
const { User, Todo } = require("./db.js");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/signup", async (req, res) => {
  const { username, password, MobileNo } = req.body;
  const response = await User.findOne({ username });
  if (response) {
    return res.send("User Already exists");
  } else {
    const newUser = await User.create({ username, password, MobileNo });
    return res.status(200).send("User Created Successfully!!");
  }
});
// Existing routes...

app.get("/dashboard/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate("posts");
      if (user) {
        res.status(200).json(user.posts); // Return todos of the user
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.send("User not found");

  if (user.password === password) {
    return res.status(200).json({ message: "Login Successful", userId: user._id });
  } else {
    return res.send("Invalid Credentials");
  }
});

app.post("/dashboard", async (req, res) => {
  const { title, description, userId } = req.body;
  const todo = await Todo.create({ title, description, userId });
  await User.findByIdAndUpdate(userId, { $push: { posts: todo._id } });
  res.json(todo);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
