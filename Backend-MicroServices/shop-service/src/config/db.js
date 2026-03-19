const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    db = client.db(); 

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("DB not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };