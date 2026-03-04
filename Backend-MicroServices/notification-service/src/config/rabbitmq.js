const amqp = require("amqplib");

let channel;
let connection;

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

      await channel.assertQueue("appointment_created", { durable: true });

      console.log("✅ Notification Service connected to RabbitMQ");
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
  getChannel
};