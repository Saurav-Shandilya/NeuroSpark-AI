const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });
  res.json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "check password and email address" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "check password and email address" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post("/google", async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ message: "No credential provided" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user without password if they don't exist
      user = await User.create({
        name,
        email,
        googleId,
        picture
      });
    } else if (!user.googleId) {
      // If user exists (previously signed up with password) but has no googleId, link them
      user.googleId = googleId;
      user.picture = picture;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, email: user.email, picture: user.picture } });

  } catch (error) {
    console.error("Google Auth Error object:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

const auth = require("../middleware/authMiddleware");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/me", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;