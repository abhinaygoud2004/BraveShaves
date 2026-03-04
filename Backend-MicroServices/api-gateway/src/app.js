const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();
const proxyRoutes = require("./routes/proxy.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

// 1. Move logging here to see the raw request
app.use((req, res, next) => {
  console.log("Gateway received:", req.method, req.url);
  next();
});

// 2. MOUNT PROXY ROUTES BEFORE express.json()
// This allows the raw data stream to flow to your microservices
app.use("/api", proxyRoutes);

// 3. Body parser only for local Gateway routes (if any)
app.use(express.json());

module.exports = app;