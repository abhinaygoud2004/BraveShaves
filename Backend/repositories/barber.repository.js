const { getDB } = require("../config/db");

const collection = () => getDB().collection("barbers");

exports.findByUsername = (username) =>
  collection().findOne({ username });

exports.findById = (barberId) =>
  collection().findOne({ barberId });

exports.findAll = () =>
  collection().find().toArray();

exports.create = (barber) =>
  collection().insertOne(barber);
