const service = require("../services/barber.service");

exports.registerBarber = async (req, res, next) => {
  try {
    await service.registerBarber(req.body);
    res.status(201).send({ message: "Barber registered successfully" });
  } catch (err) {
    next(err);
  }
};

exports.loginBarber = async (req, res, next) => {
  try {
    const data = await service.loginBarber(req.body);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.getAllBarbers = async (req, res, next) => {
  try {
    const barbers = await service.getAllBarbers();
    console.log("barber keys:", Object.keys(barbers[0]));

    res.send(barbers);
  } catch (err) {
    next(err);
  }
};

exports.getBarberById = async (req, res, next) => {
  try {
    const barber = await service.getBarberById(req.params.barberId);
    console.log("🚨 getBarberById HIT:", req.params.barberId);

    res.send(barber);
  } catch (err) {
    next(err);
  }
};
