const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const collection = () => getDB().collection("appointments");

exports.create = (appointment) =>
  collection().insertOne(appointment);

exports.findByUserId = (userId) =>
  collection().find({ userId }).toArray();

exports.findByBarberId = (barberId) =>
  collection().find({ barberId }).toArray();

exports.updateStatus = (appointmentId, status) =>
  collection().updateOne(
    { _id: new ObjectId(appointmentId) },
    { $set: { status } }
  );
