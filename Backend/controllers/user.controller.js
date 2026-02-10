const service = require("../services/user.service");

exports.registerUser = async (req, res, next) => {
  try {
    await service.registerUser(req.body);
    console.log("📥 Controller hit");
    // console.log("📦 Body:", req.body);
    res.status(201).send({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const data = await service.loginUser(req.body);
    res.send(data);
  } catch (err) {
    next(err);
  }
};


exports.getUser = async (req, res, next) => {
  try {
    const user = await service.getUser(req.params.userId);
    res.send(user);
  } catch (err) {
    next(err);
  }
};