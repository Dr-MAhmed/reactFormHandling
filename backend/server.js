const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const connectToDb = require("./config/db");
const User = require("./models/User");

// Connect to MongoDB
connectToDb();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Register Route (GET - Optional, for testing)
app.get("/register", (req, res) => {
  res.send("Register Endpoint - Use POST to register a user.");
});

// Register Route (POST - Create User)
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received Data:", { name, email, password });
  
  try {
    // Create and save user
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    // Respond after successful save
    return res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.log(error)
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
