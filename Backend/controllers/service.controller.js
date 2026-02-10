const serviceService = require("../services/service.service");

exports.create = async (req, res, next) => {
  try {
    const service = await serviceService.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};

exports.listByBarber = async (req, res, next) => {
  try {
    const services = await serviceService.listByBarber(req.params.barberId);
    res.json(services);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const service = await serviceService.update(req.params.id, req.body);
    res.json(service);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await serviceService.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
