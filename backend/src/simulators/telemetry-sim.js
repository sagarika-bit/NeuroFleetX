const Vehicle = require("../models/Vehicle");

// Move vehicles slightly every 5 seconds
async function randomWalkVehicles(io) {
  try {
    const vehicles = await Vehicle.find();

    for (let v of vehicles) {
      // random movement
      v.telemetry.location.lat += (Math.random() - 0.5) * 0.001;
      v.telemetry.location.lng += (Math.random() - 0.5) * 0.001;

      v.telemetry.speed = Math.floor(Math.random() * 80);
      v.telemetry.battery = Math.max(0, v.telemetry.battery - Math.random() * 1);
      v.telemetry.fuel = Math.max(0, v.telemetry.fuel - Math.random() * 1);

      await v.save();

      // Send to all frontend clients
      io.emit("vehicle:update", v);
    }

    console.log("Telemetry broadcasted");
  } catch (err) {
    console.error("Telemetry error:", err);
  }
}

module.exports = { randomWalkVehicles };
