const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {

  const connection = await amqp.connect("amqp://rabbitmq:5672");

  channel = await connection.createChannel();

  await channel.assertExchange("brave.events", "topic", {
    durable: true
  });

  console.log("RabbitMQ connected");

  return channel;
}

function getChannel() {
  return channel;
}

module.exports = {
  connectRabbitMQ,
  getChannel
};