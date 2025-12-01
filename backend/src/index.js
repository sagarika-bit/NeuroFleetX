// src/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const connectDb = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect database
connectDb();

// Test API
app.get("/", (req, res) => res.json({ status: "API Running" }));

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/vehicles", require("./routes/vehicle.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/users", require("./routes/user.routes"));

/* ----------------------------------------------------
   SOCKET.IO SERVER
----------------------------------------------------- */
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"]
  }
});

// ⬅️ SO routes can import io
module.exports.io = io;

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

/* ----------------------------------------------------
   TELEMETRY SIMULATOR
----------------------------------------------------- */
const { randomWalkVehicles } = require("./simulators/telemetry-sim");

// Runs every 5 seconds
setInterval(() => {
  randomWalkVehicles(io);
}, 5000);

/* ----------------------------------------------------
   START SERVER
----------------------------------------------------- */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
