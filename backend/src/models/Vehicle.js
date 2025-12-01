const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: String,
  plateNumber: String,
  status: { type: String, default: "IDLE" },
  telemetry: {
    speed: Number,
    battery: Number,
    fuel: Number,
    location: { lat: Number, lng: Number }
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
