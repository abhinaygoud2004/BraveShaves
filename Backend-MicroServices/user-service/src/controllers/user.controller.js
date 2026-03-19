const service = require("../services/user.service");


exports.register = async (req, res, next) => {
  try {
    const user=await service.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.health=async(req,res,next)=>{
  res.send("User Service is alive");
}


exports.login = async (req,res,next) => {
  try{
    const user=await service.login(req.body);
    res.json({message:"success",user});
  }
  catch(error){
    next(error);
  }
};


exports.userById = async (req, res,next) => {
  try {
    console.log("user id",req.user.id)
    const user = await service.userById(req.user.id);
    // console.log("user id",)
    // console.log("me ",user);
    res.json(user);
  } catch (err) {
    next(err);
  }
};