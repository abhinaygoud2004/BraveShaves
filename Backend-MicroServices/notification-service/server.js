const { connectRabbitMQ } = require("./src/config/rabbitmq");
const { consumeAppointmentCreated } = require("./src/consumers/appointment.consumer");

const start = async () => {
  await connectRabbitMQ();
  await consumeAppointmentCreated();

  console.log("Notification Service running...");
};

start();