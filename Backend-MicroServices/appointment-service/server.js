const app = require("./src/app");
const { connectRabbitMQ } = require("./src/config/rabbitmq");
const { consumePaymentCompleted } = require("./src/consumers/payment.consumer");

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  await connectRabbitMQ();
  await consumePaymentCompleted();
  app.listen(PORT, () => {
    console.log(`Appointment Service running on ${PORT}`);
  });
};

startServer();