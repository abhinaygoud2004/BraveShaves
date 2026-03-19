const {getDB} = require("../config/db");

const COLLECTION="barbers";
exports.create = async ({ user_id, experience_years }) => {
  const db = getDB();

  const result = await db.collection(COLLECTION).insertOne({
    user_id,
    experience_years,
    rating: 0,
    created_at: new Date()
  });

  return {
    id: result.insertedId,
    user_id,
    experience_years
  };
};

exports.findAll = async () => {
  const db = getDB();

  return db.collection(COLLECTION).find({}).toArray();
};

exports.findById = async (id) => {
  const db = getDB();
  const { ObjectId } = require("mongodb");

  const row = await db.collection(COLLECTION).findOne({
    _id: new ObjectId(id)
  });

  console.log("in repo ", row);
  return row;
};