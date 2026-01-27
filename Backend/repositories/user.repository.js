const { getDB } = require("../config/db");

const collection = () => getDB().collection("users");

exports.findByUsername = (username) =>
  collection().findOne({ username });

exports.findById = (userId) =>
  collection().findOne({ userId });

exports.create = (user) =>
  collection().insertOne(user);
