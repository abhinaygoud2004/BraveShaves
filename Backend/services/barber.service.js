const barberRepo = require("../repositories/barber.repository");

exports.create = async ({ user_id, experience_years }) => {
  return barberRepo.create({ user_id, experience_years });
};

exports.list = async () => {
  return barberRepo.findAll();
};

exports.getById = async (id) => {
  const barber = await barberRepo.findById(id);
  if (!barber) throw new Error("Barber not found");
  return barber;
};
