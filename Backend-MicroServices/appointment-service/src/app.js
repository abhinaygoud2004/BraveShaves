const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/appointment.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/appointments", routes);

app.use(errorMiddleware);

module.exports = app;