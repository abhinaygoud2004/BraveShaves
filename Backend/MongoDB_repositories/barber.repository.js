const { getDB } = require("../config/db");

const collection = () => getDB().collection("barbers");

exports.findByUsername = (username) =>
  collection().findOne({ username });

exports.findById = (barberId) => {
  const id = Number(barberId);   // convert string → number

  return collection().findOne({ barberId: id });
};
  

exports.findAll = () =>
  collection().find().toArray();

exports.create = (barber) =>
  collection().insertOne(barber);
