const service = require("../services/user.service");


exports.register = async (req, res, next) => {
  try {
    const user=await service.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};



exports.login = async (req,res,next) => {
  try{
    const user=await service.login(req.body);
    res.json(user);
  }
  catch(error){
    next(error);
  }
};


exports.user = async (req, res,next) => {
  try {
    const user = await service.user(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};