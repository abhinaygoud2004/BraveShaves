const { MongoClient } = require("mongodb");
require("dotenv").config();

let client;
let db;

// Connect to MongoDB
const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    db = client.db(); // DB name comes from URI

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Get DB instance
const getDB = () => {
  if (!db) {
    throw new Error("DB not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };