const app = require("./src/app");
const startGrpcServer = require("./src/gRPC/services.grpc.server")

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Shop Service running on ${PORT}`);
});

startGrpcServer();