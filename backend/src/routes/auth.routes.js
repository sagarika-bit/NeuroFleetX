// src/routes/auth.routes.js
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const permit = require("../middleware/roles");

/* ----------------------------------------------------
   REGISTER (ADMIN ONLY)
   Admin can create managers/customers
---------------------------------------------------- */
router.post("/register", auth, permit("ADMIN"), async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate input
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be 6+ chars" });
  }

  // Check email exists
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  // Hash password
  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash: hash,
    role
  });

  // Hide password
  const userSafe = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  res.json(userSafe);
});

/* ----------------------------------------------------
   LOGIN
---------------------------------------------------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate
  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  // User exists?
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Check password
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  // Create JWT
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }       // 🔥 very important
  );

  // Safe user object
  const userSafe = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  res.json({ token, user: userSafe });
});

module.exports = router;
