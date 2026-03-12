const app = require("./src/app");
const startGrpcServer = require("./src/gRPC/services.grpc.server");
const { connectRabbitMQ } = require("./src/config/rabbitmq");
const startCacheConsumer = require("./src/consumers/cache.consumer");

const PORT = process.env.PORT || 5002;

async function startServer() {
  try {
    await connectRabbitMQ();
    await startCacheConsumer();
    await startGrpcServer();

    app.listen(PORT, () => {
      console.log(`Shop Service running on ${PORT}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();