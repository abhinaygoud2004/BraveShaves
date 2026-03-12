const { connectRabbitMQ } = require("./src/config/rabbitmq");
const startNotificationConsumer = require("./src/consumers/notification.consumer");

async function startServer() {

  await connectRabbitMQ();

  await startNotificationConsumer();

  console.log("Notification service running");
}

startServer();