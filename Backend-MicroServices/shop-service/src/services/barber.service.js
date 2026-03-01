const barberRepo = require("../repositories/barber.repository");
const shopRepo = require("../repositories/shop.repository");

exports.create = async ({ user_id, shop_id, experience_years }) => {

  if (!user_id || !shop_id) {
    throw new Error("User ID and Shop ID are required");
  }

  // Check if shop exists
  const shop = await shopRepo.findById(shop_id);
  if (!shop) throw new Error("Shop does not exist");

  // Prevent duplicate barber
  const existing = await barberRepo.findByUserId(user_id);
  if (existing) throw new Error("Barber already exists");

  return barberRepo.create({ user_id, shop_id, experience_years });
};

exports.list = async () => {
  return barberRepo.findAll();
};

exports.getById = async (id) => {
  const barber = await barberRepo.findById(id);
  if (!barber) throw new Error("Barber not found");
  return barber;
};