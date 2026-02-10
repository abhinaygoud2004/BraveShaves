const shopService = require("../services/shop.service");

exports.create = async (req, res, next) => {
  try {
    const shop = await shopService.create(req.body);
    res.status(201).json(shop);
  } catch (err) {
    next(err);
  }
};

exports.getByBarber = async (req, res, next) => {
  try {
    const shop = await shopService.getByBarber(req.params.barberId);
    res.json(shop);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const shop = await shopService.update(req.params.id, req.body);
    res.json(shop);
  } catch (err) {
    next(err);
  }
};
