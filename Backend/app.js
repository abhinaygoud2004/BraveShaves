const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorMiddleware = require("./middlewares/error.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
 * PUBLIC ROUTES (NO AUTH)
 */
app.use("/api/user",require("./routes/user.routes"));

/**
 * PROTECTED ROUTES (AUTH REQUIRED)
 */
app.use("/api/barbers", authMiddleware, require("./routes/barber.routes"));
app.use("/api/shops", authMiddleware, require("./routes/shop.routes"));
app.use("/api/services", authMiddleware, require("./routes/service.routes"));
app.use("/api/appointments", authMiddleware, require("./routes/appointment.routes"));
app.use("/api/payments", authMiddleware, require("./routes/payment.routes"));

/**
 * ERROR HANDLER (ALWAYS LAST)
 */
app.use(errorMiddleware);

module.exports = app;
