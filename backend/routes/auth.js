const express = require("express");
const router = express.Router();
const User = require("../models/user");

// health check (testing ke liye)
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = new User({ name, email, password });
  await user.save();

  res.status(201).json({ message: "User registered" });
});

module.exports = router;
