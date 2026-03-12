const serviceRepo = require("../repositories/service.repository");
const barberRepo = require("../repositories/barber.repository");
const redisClient = require("../config/redis");
const { getChannel } = require("../config/rabbitmq");

exports.create = async (data) => {

  if (!data.barber_id) {
    throw new Error("Barber ID is required");
  }

  const barber = await barberRepo.findById(data.barber_id);
  if (!barber) throw new Error("Barber does not exist");

  if (data.price <= 0) {
    throw new Error("Invalid service price");
  }

  const service = await serviceRepo.create(data);

  // local cache invalidation
  await redisClient.del(`services:barber:${data.barber_id}`);

  // publish event
  const channel = getChannel();
  channel.publish(
    "brave.events",
    "service.updated",
    Buffer.from(JSON.stringify({
      barberId: data.barber_id
    }))
  );

  return service;
};

exports.listByBarber = async (barberId) => {

  const cacheKey = `services:barber:${barberId}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const services = await serviceRepo.findByBarber(barberId);

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(services));

  return services;
};

exports.update = async (id, data) => {

  const service = await serviceRepo.findById(id);

  await serviceRepo.update(id, data);

  const barberId = data.barber_id || service.barber_id;

  await redisClient.del(`services:barber:${barberId}`);

  const channel = getChannel();

  channel.publish(
    "brave.events",
    "service.updated",
    Buffer.from(JSON.stringify({
      barberId
    }))
  );

  return { message: "Service updated successfully" };
};

exports.remove = async (id) => {

  const service = await serviceRepo.findById(id);

  await serviceRepo.remove(id);

  if (service) {

    await redisClient.del(`services:barber:${service.barber_id}`);

    const channel = getChannel();

    channel.publish(
      "brave.events",
      "service.updated",
      Buffer.from(JSON.stringify({
        barberId: service.barber_id
      }))
    );
  }
};

exports.getServicesByIds = async (ids) => {

  if (!ids || ids.length === 0) return [];

  const cacheKey = `services:ids:${ids.sort().join(",")}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const services = await serviceRepo.findByIds(ids);

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(services));

  return services;
};