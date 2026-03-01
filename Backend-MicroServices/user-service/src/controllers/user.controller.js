const { use } = require("../app");
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
    res.json({message:"success",user});
  }
  catch(error){
    next(error);
  }
};


exports.user = async (req, res,next) => {
  try {
    const user = await service.user(req.user.id);
    // console.log("me",user);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

