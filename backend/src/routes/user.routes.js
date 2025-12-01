// src/routes/user.routes.js
const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const permit = require("../middleware/roles");
const bcrypt = require("bcryptjs");

// SAFE io import to avoid circular issues
let io;
try {
  io = require("../index").io;
} catch (e) {
  io = null;
}

/* ---------------------------------------------------
   GET ALL USERS (ADMIN ONLY)
---------------------------------------------------- */
router.get("/", auth, permit("ADMIN"), async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
});

/* ---------------------------------------------------
   GET SINGLE USER (ADMIN ONLY)
---------------------------------------------------- */
router.get("/:id", auth, permit("ADMIN"), async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

/* ---------------------------------------------------
   CREATE NEW USER (ADMIN ONLY)
---------------------------------------------------- */
router.post("/", auth, permit("ADMIN"), async (req, res) => {
  const { name, email, password, role } = req.body;

  // validations
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash: hash,
    role
  });

  // 🔥 emit user created
  if (io) io.emit("users:created", user);

  res.json(user);
});

/* ---------------------------------------------------
   UPDATE USER ROLE (ADMIN ONLY)
---------------------------------------------------- */
router.put("/:id/role", auth, permit("ADMIN"), async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  // prevent deleting yourself
  if (req.params.id === req.user.id) {
    return res.status(400).json({ message: "You cannot change your own role" });
  }

  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-passwordHash");

  // 🔥 emit update
  if (io) io.emit("users:updated", updated);

  res.json(updated);
});

/* ---------------------------------------------------
   DELETE USER (ADMIN ONLY)
---------------------------------------------------- */
router.delete("/:id", auth, permit("ADMIN"), async (req, res) => {
  // prevent deleting yourself
  if (req.params.id === req.user.id) {
    return res.status(400).json({ message: "You cannot delete yourself" });
  }

  const deleted = await User.findByIdAndDelete(req.params.id);

  // 🔥 emit delete
  if (io) io.emit("users:deleted", req.params.id);

  res.json({ success: true });
});

module.exports = router;
