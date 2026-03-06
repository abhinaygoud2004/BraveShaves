const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const startGrpcServer = require("./gRPC/user.grpc.server");

startGrpcServer();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("User Service received:", req.method, req.originalUrl);
    next();
  });

app.use("/api/users", userRoutes);

app.use(errorMiddleware);

module.exports = app;