const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  const client = await MongoClient.connect(process.env.MCLIENT);
  db = client.db("braveshaves");
  console.log("✅ MongoDB Connected");
};

const getDB = () => db;

module.exports = { connectDB, getDB };
