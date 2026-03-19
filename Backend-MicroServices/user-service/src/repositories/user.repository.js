const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const COLLECTION = "users";

// ================= CREATE USER =================
exports.create = async (user) => {
  const db = getDB();

  const result = await db.collection(COLLECTION).insertOne({
    name: user.name,
    email: user.email,
    phone: user.phone || null,
    passwordHash: user.password, // already hashed before calling
    role: user.role || "user",
    createdAt: new Date()
  });
  console.log("registered,",result)
  return { id: result.insertedId };
};


// ================= FIND BY EMAIL =================
exports.findByEmail = async (email) => {
  const db = getDB();

  return db.collection(COLLECTION).findOne({ email });
};


// ================= FIND BY ID =================
exports.findById = async (id) => {
  const db = getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id)
  });
};


// ================= FIND BY IDS =================
exports.findByIds = async (ids) => {
  const db = getDB();

  const objectIds = ids.map(id => new ObjectId(id));

  return db.collection(COLLECTION)
    .find({
      _id: { $in: objectIds }
    })
    .project({
      name: 1,
      email: 1,
      phone: 1,
      role: 1
    })
    .toArray();
};