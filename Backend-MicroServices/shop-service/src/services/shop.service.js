const shopRepo = require("../repositories/shop.repository");
const redisClient = require("../config/redis");
const { getChannel } = require("../config/rabbitmq");

const ALL_SHOPS_KEY = "shops:all";

exports.create = async (data) => {

  if (!data.name || !data.location) {
    throw new Error("Shop name and location required");
  }

  const shop = await shopRepo.create(data);

  await redisClient.del(ALL_SHOPS_KEY);

  const channel = getChannel();

  channel.publish(
    "brave.events",
    "shop.updated",
    Buffer.from(JSON.stringify({
      shopId: shop.id
    }))
  );

  return shop;
};

exports.getByBarber = async (barberId) => {

  const cacheKey = `shop:barber:${barberId}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const shop = await shopRepo.findByBarber(barberId);

  if (!shop) throw new Error("Shop not found");

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(shop));

  return shop;
};

exports.update = async (id, data) => {

  await shopRepo.update(id, data);

  await redisClient.del(ALL_SHOPS_KEY);
  await redisClient.del(`shop:${id}`);

  const channel = getChannel();

  channel.publish(
    "brave.events",
    "shop.updated",
    Buffer.from(JSON.stringify({
      shopId: id
    }))
  );

  return { message: "Shop updated successfully" };
};

exports.getAllShops = async () => {

  const cached = await redisClient.get(ALL_SHOPS_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  const shops = await shopRepo.getAllShops();

  await redisClient.setEx(ALL_SHOPS_KEY, 3600, JSON.stringify(shops));

  return shops;
};