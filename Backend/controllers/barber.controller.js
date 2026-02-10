const barberService = require("../services/barber.service");

exports.create = async (req, res, next) => {
  try {
    const barber = await barberService.create(req.body);
    res.status(201).json(barber);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const barbers = await barberService.list();
    res.json(barbers);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const barber = await barberService.getById(req.params.id);
    res.json(barber);
  } catch (err) {
    next(err);
  }
};
