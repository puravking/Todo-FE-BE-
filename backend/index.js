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

    const response = await User.findOne({ username: username });

    if (response) {
        return res.send("User Already exists");
    } else {
        const newUser = await User.create({
            username,
            password,
            MobileNo
        });

        return res.status(200).json({ message: "User Created Successfully!!", userId: newUser._id });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.send("User not found");
    }

    if (user.password === password) {
        return res.json({ message: "Login Successful", userId: user._id });
    } else {
        return res.send("Invalid Credentials");
    }
});

// ✅ Dashboard route to create todo with userId
app.post("/dashboard", async (req, res) => {
    const { title, description, userId } = req.body;

    try {
        const todo = await Todo.create({
            title,
            description,
            userId
        });

        // Optional: Push todo._id to user's posts array
        await User.findByIdAndUpdate(userId, {
            $push: { posts: todo._id }
        });

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create todo" });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
