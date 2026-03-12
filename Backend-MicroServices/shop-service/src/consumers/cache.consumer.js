const redisClient = require("../config/redis");
const { getChannel } = require("../config/rabbitmq");

async function startCacheConsumer() {

  const channel = getChannel();

  const exchange = "brave.events";

  const q = await channel.assertQueue("cache.queue", {
    durable: true
  });

  await channel.bindQueue(q.queue, exchange, "service.updated");
  await channel.bindQueue(q.queue, exchange, "shop.updated");

  channel.consume(q.queue, async (msg) => {

    const event = JSON.parse(msg.content.toString());

    if (msg.fields.routingKey === "service.updated") {

      await redisClient.del(`services:barber:${event.barberId}`);
    }

    if (msg.fields.routingKey === "shop.updated") {

      await redisClient.del("shops:all");
      await redisClient.del(`shop:${event.shopId}`);
    }

    channel.ack(msg);

  });
}

module.exports = startCacheConsumer;