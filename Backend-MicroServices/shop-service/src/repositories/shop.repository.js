const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const COLLECTION = "shops";

// CREATE SHOP (with barber already inside)
exports.create = async ({ barber_id, shop_name, address }) => {
  const db = getDB();

  const result = await db.collection(COLLECTION).insertOne({
    shopName: shop_name,
    address,

    barber: {
      userId: barber_id,
      experienceYears: 0
    },

    services: [],
    createdAt: new Date()
  });

  return { id: result.insertedId };
};

// FIND BY BARBER
exports.findByBarber = async (barberId) => {
  const db = getDB();

  return db.collection(COLLECTION).findOne({
    "barber.userId": barberId
  });
};

// UPDATE SHOP
exports.update = async (id, data) => {
  const db = getDB();

  await db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        shopName: data.shop_name,
        address: data.address
      }
    }
  );
};

// GET ALL SHOPS
exports.getAllShops = async () => {
  const db = getDB();

  const row = await db.collection(COLLECTION).find({}).toArray();

  console.log("all shops repo ", row);
  return row;
};