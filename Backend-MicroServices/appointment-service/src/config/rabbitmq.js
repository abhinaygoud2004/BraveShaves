const amqp = require("amqplib");

let channel;
let connection;

const EXCHANGE_NAME = "brave.events";

const connectRabbitMQ = async () => {

  while (true) {

    try {

      connection = await amqp.connect(process.env.RABBITMQ_URL);

      connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
      });

      connection.on("close", () => {
        console.error("RabbitMQ connection closed. Reconnecting...");
        setTimeout(connectRabbitMQ, 5000);
      });

      channel = await connection.createChannel();

      // create exchange instead of queues
      await channel.assertExchange(EXCHANGE_NAME, "topic", {
        durable: true
      });

      console.log("✅ Appointment Service connected to RabbitMQ");

      break;

    } catch (error) {

      console.log("❌ RabbitMQ not ready, retrying in 5 seconds...");
      await new Promise(res => setTimeout(res, 5000));

    }
  }
};

const getChannel = () => {

  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }

  return channel;
};

module.exports = {
  connectRabbitMQ,
  getChannel,
  EXCHANGE_NAME
};