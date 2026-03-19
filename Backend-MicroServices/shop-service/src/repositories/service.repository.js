const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const COLLECTION = "shops";

// CREATE SERVICE (push into services array)
exports.create = async ({ barber_id, name, price, duration_minutes }) => {
  const db = getDB();

  const serviceId = new ObjectId().toString();

  await db.collection(COLLECTION).updateOne(
    { "barber.userId": barber_id },
    {
      $push: {
        services: {
          serviceId,
          name,
          price,
          duration_minutes
        }
      }
    }
  );

  return { id: serviceId };
};

// FIND SERVICES BY BARBER
exports.findByBarber = async (barberId) => {
  const db = getDB();

  const shop = await db.collection(COLLECTION).findOne({
    "barber.userId": barberId
  });

  return shop ? shop.services : [];
};

// UPDATE SERVICE
exports.update = async (id, data) => {
  const db = getDB();

  await db.collection(COLLECTION).updateOne(
    { "services.serviceId": id },
    {
      $set: {
        "services.$.name": data.name,
        "services.$.price": data.price,
        "services.$.duration_minutes": data.duration_minutes
      }
    }
  );
};

// REMOVE SERVICE
exports.remove = async (id) => {
  const db = getDB();

  await db.collection(COLLECTION).updateOne(
    {},
    {
      $pull: {
        services: { serviceId: id }
      }
    }
  );
};

// FIND SERVICES BY IDS
exports.findByIds = async (ids) => {
  const db = getDB();

  const shops = await db.collection(COLLECTION)
    .find({
      "services.serviceId": { $in: ids }
    })
    .toArray();

  const services = [];

  shops.forEach(shop => {
    shop.services.forEach(s => {
      if (ids.includes(s.serviceId)) {
        services.push({
          id: s.serviceId,
          name: s.name,
          barber_id: shop.barber.userId,
          price: s.price,
          duration_minutes: s.duration_minutes
        });
      }
    });
  });

  return services;
};