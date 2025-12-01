// src/routes/booking.routes.js
const router = require("express").Router();
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const auth = require("../middleware/auth");
const permit = require("../middleware/roles");

// SAFELY import io (no circular dependency issues)
let io;
try {
  io = require("../index").io;
} catch (e) {
  io = null;
}

/* ---------------------------------------------------
   CREATE BOOKING
---------------------------------------------------- */
router.post("/", auth, async (req, res) => {
  const { vehicle, startTime, endTime } = req.body;

  if (!vehicle || !startTime || !endTime) {
    return res.status(400).json({ message: "Missing booking fields" });
  }

  // validate vehicle exists
  const v = await Vehicle.findById(vehicle);
  if (!v) return res.status(404).json({ message: "Vehicle not found" });

  // create booking
  const booking = await Booking.create({
    ...req.body,
    customer: req.user.id,
  });

  // 🔥 emit socket event for dashboards
  if (io) io.emit("booking:new", booking);

  res.json(booking);
});

/* ---------------------------------------------------
   LIST BOOKINGS
---------------------------------------------------- */
router.get("/", auth, async (req, res) => {
  let bookings;

  if (req.user.role === "ADMIN" || req.user.role === "MANAGER") {
    // admin/manager see all
    bookings = await Booking.find().populate("vehicle customer");
  } else {
    // customer sees only their bookings
    bookings = await Booking.find({ customer: req.user.id }).populate("vehicle");
  }

  res.json(bookings);
});

/* ---------------------------------------------------
   GET SINGLE BOOKING
---------------------------------------------------- */
router.get("/:id", auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("vehicle customer");
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  // customer cannot view others' booking
  if (req.user.role === "CUSTOMER" && booking.customer._id.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.json(booking);
});

/* ---------------------------------------------------
   DELETE BOOKING
---------------------------------------------------- */
router.delete("/:id", auth, async (req, res) => {
  const b = await Booking.findById(req.params.id);
  if (!b) return res.status(404).json({ message: "Booking not found" });

  // CUSTOMER cannot delete someone else's booking
  if (req.user.role === "CUSTOMER" && b.customer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await b.deleteOne();

  if (io) io.emit("booking:deleted", req.params.id);

  res.json({ success: true });
});

module.exports = router;
