const serviceRepo = require("../repositories/service.repository");

exports.create = async (data) => {
  return serviceRepo.create(data);
};

exports.listByBarber = async (barberId) => {
  return serviceRepo.findByBarber(barberId);
};

exports.update = async (id, data) => {
  await serviceRepo.update(id, data);
  return { message: "Service updated successfully" };
};

exports.remove = async (id) => {
  await serviceRepo.remove(id);
};
