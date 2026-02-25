const shopRepo = require("../repositories/shop.repository");

exports.create = async (data) => {
  return shopRepo.create(data);
};

exports.getByBarber = async (barberId) => {
  const shop = await shopRepo.findByBarber(barberId);
  if (!shop) throw new Error("Shop not found");
  return shop;
};

exports.update = async (id, data) => {
  await shopRepo.update(id, data);
  return { message: "Shop updated successfully" };
};

exports.getAllShops = async () => {
  const allShops = await shopRepo.getAllShops();
  if(!allShops)
    throw new Error("No shops found");
  return allShops;
}