const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },

  origin: {
    lat: Number,
    lng: Number
  },

  destination: {
    lat: Number,
    lng: Number
  },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  status: {
    type: String,
    enum: ["ONGOING", "COMPLETED", "CANCELLED"],
    default: "ONGOING"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
