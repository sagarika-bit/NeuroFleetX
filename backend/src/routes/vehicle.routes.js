// src/routes/vehicle.routes.js
const router = require("express").Router();
const Vehicle = require("../models/Vehicle");
const auth = require("../middleware/auth");
const permit = require("../middleware/roles");

// SAFELY import io without circular issues
let io;
try {
  io = require("../index").io;
} catch (e) {
  io = null;
}

// helper to emit telemetry updates
function emitTelemetry(v) {
  if (io) {
    io.emit("telemetry:update", v);
  }
}

/* -------------------------------------------------------
   CREATE VEHICLE
--------------------------------------------------------- */
router.post("/", auth, permit("ADMIN", "MANAGER"), async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  emitTelemetry(vehicle);
  res.json(vehicle);
});

/* -------------------------------------------------------
   LIST ALL VEHICLES
--------------------------------------------------------- */
router.get("/", auth, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

/* -------------------------------------------------------
   GET SINGLE VEHICLE
--------------------------------------------------------- */
router.get("/:id", auth, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  res.json(vehicle);
});

/* -------------------------------------------------------
   UPDATE VEHICLE
--------------------------------------------------------- */
router.put("/:id", auth, permit("ADMIN", "MANAGER"), async (req, res) => {
  const v = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!v) return res.status(404).json({ message: "Vehicle not found" });

  emitTelemetry(v);
  res.json(v);
});

/* -------------------------------------------------------
   TELEMETRY SIMULATOR ENDPOINT
--------------------------------------------------------- */
router.post("/:id/simulate", auth, permit("ADMIN", "MANAGER"), async (req, res) => {
  const v = await Vehicle.findById(req.params.id);
  if (!v) return res.status(404).json({ message: "Not found" });

  // RANDOM telemetry movement
  v.telemetry.speed = Math.floor(Math.random() * 80);
  v.telemetry.battery = Math.max(0, v.telemetry.battery - Math.random() * 5);
  v.telemetry.fuel = Math.max(0, v.telemetry.fuel - Math.random() * 3);
  v.telemetry.location.lat += (Math.random() - 0.5) * 0.01;
  v.telemetry.location.lng += (Math.random() - 0.5) * 0.01;

  v.last_telemetry_time = new Date();
  await v.save();

  emitTelemetry(v);
  res.json(v);
});

module.exports = router;
