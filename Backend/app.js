const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const barberRoutes = require("./routes/barber.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const { connectDB } = require("./config/db");
const errorHandler = require("./middlewares/error.middleware");
const notFound = require("./middlewares/notFound.middleware");

require("dotenv").config();

const app = express();

/* ✅ CORS: allow React dev server */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Handle browser preflight requests */
app.options("*", cors());

app.use(express.json());

// 🔎 Debug: log all requests
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// ✅ DB connection
connectDB();

// ✅ API routes
app.use("/user-api", userRoutes);
app.use("/barber-api", barberRoutes);
app.use("/appointment-api", appointmentRoutes);

// ❌ React build disabled in development

// ❌ NOT FOUND & ERROR HANDLERS MUST BE LAST
app.use(notFound);
app.use(errorHandler);

module.exports = app;
