const amqp = require("amqplib");

let channel;

exports.connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue("appointment_created");
  await channel.assertQueue("payment_completed");
};

exports.getChannel = () => channel;