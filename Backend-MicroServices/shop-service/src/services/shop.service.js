const shopRepo = require("../repositories/shop.repository");
const redisClient = require("../config/redis");

exports.create = async (data) => {

  if (!data.name || !data.location) {
    throw new Error("Shop name and location required");
  }

  const shop = await shopRepo.create(data);

  // Invalidate cache
  await redisClient.del("all_shops");

  return shop;
};

exports.getByBarber = async (barberId) => {
  const shop = await shopRepo.findByBarber(barberId);
  if (!shop) throw new Error("Shop not found");
  return shop;
};

exports.update = async (id, data) => {
  await shopRepo.update(id, data);

  // Clear cache
  await redisClient.del("all_shops");

  return { message: "Shop updated successfully" };
};

exports.getAllShops = async () => {

  const cached = await redisClient.get("all_shops");
  if (cached) {
    return JSON.parse(cached);
  }

  const shops = await shopRepo.getAllShops();

  await redisClient.setEx("all_shops", 3600, JSON.stringify(shops));

  return shops;
};