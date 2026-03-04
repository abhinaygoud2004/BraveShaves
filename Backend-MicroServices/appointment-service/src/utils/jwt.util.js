const jwt=require("jsonwebtoken")

exports.signToken=(payload)=>
  jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"7d"});

exports.verifyToken=(token)=>
  jwt.verify(token,process.env.SECRET_KEY);
