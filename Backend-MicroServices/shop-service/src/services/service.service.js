const serviceRepo = require("../repositories/service.repository");
const barberRepo = require("../repositories/barber.repository");

exports.create = async (data) => {

  if (!data.barber_id) {
    throw new Error("Barber ID is required");
  }

  const barber = await barberRepo.findById(data.barber_id);
  if (!barber) throw new Error("Barber does not exist");

  if (data.price <= 0) {
    throw new Error("Invalid service price");
  }

  return serviceRepo.create(data);
};

exports.listByBarber = async (barberId) => {
  // const barber = await barberRepo.findById(barberId);
  // if (!barber) throw new Error("Barber not found");

  return serviceRepo.findByBarber(barberId);
};

exports.update = async (id, data) => {
  await serviceRepo.update(id, data);
  return { message: "Service updated successfully" };
};

exports.remove = async (id) => {
  await serviceRepo.remove(id);
};


exports.getServicesByIds = async (ids) => {

  if (!ids || ids.length === 0) return [];

  return serviceRepo.findByIds(ids);
};
