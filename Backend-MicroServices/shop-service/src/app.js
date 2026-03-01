const express = require("express");
const cors = require("cors");
require("dotenv").config();

const shopRoutes = require("./routes/shop.routes");
const barberRoutes = require("./routes/barber.routes");
const serviceRoutes = require("./routes/service.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shops", shopRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/services", serviceRoutes);

app.use(errorMiddleware);

module.exports = app;