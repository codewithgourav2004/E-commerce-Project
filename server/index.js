const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/emplyee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema and model
const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Register = mongoose.model("Register", registerSchema, "register");

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  try {
    console.log("Signup data:", req.body);
    const newUser = new Register(req.body);
    await newUser.save();
    res.json({ message: "User registered successfully", id: newUser._id });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route based on _id only (no JWT)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Register.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //  Send user's name in response
    res.json({
      token: "mock_token_123",
      name: user.name,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
