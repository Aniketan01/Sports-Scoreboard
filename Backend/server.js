const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://aniketan:aniketan01@cluster0.2jdnr.mongodb.net/sports", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB Connection Error:", err));

// User Model
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,  // Plain-text password (Not Recommended for Production)
}));

// Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }

  await new User({ username, email, password }).save();
  res.status(201).json({ message: "User registered successfully" });
});

// Login Route (NO ENCRYPTION)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  res.json({ success: true, user: { username: user.username, email: user.email } });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
