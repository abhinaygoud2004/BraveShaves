const exp = require("express")
const userApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require("./middlewares/verifyToken")
const multerObj=require("./middlewares/cloudinaryConfig")

userApp.use(exp.json());

userApp.get('/get-user/:userId',
  expressAsyncHandler(async (request, response) => {
    // Get the user ID from the URL parameters
    const userId = request.params.userId;

    // Get userCollectionObj
    const userCollectionObj = request.app.get("userCollectionObj");

    // Find the user with the specified user ID
    let user = await userCollectionObj.findOne({ userId });

    if (!user) {
      // If the user is not found, return an error response
      response.status(404).send({ message: "User not found" });
    } else {
      // If the user is found, return the user data
      response.status(200).send({ message: "User data", payload: user });
    }
  })
);


userApp.post("/register",
    expressAsyncHandler(async (request, response) => {
        //get userCollectionObj
        const userCollectionObj = request.app.get("userCollectionObj")
        //get newUser from request
        const newUser = request.body

        //check for duplicate user by username
        let userOfDB = await userCollectionObj.findOne({ username: newUser.username })
        //if user already existed,send res to client as "User already existed"
        if (userOfDB != null) {
            response.status(200).send({ message: "User already existed" })
        }
        //if user not existed
        else {


            //add CDN link of cloudinary image to user boj
            // newUser.Image = request.file.path;

            //hash the password
            let hashedPassword = await bcryptjs.hash(newUser.password, 5)
           
            //replace plain password with hashed password
            newUser.password = hashedPassword;
            //insert user

            await userCollectionObj.insertOne(newUser)
            //send response
            response.status(201).send({ message: "User created" })
        }
    }))

    userApp.post('/login',expressAsyncHandler(async(request,response)=>{
        //get userCollectionObj
        const userCollectionObj=request.app.get("userCollectionObj")

          //get user credentials from request
          const userCredObj=request.body;
          //verify username
          let userOfDB=await userCollectionObj.findOne({username:userCredObj.username})
          
          //if username if invalid
          if(userOfDB===null){
            response.status(200).send({message:"Invalid username"})
          }
          //if username is valid
          else{
             //verify password
             //hash the password
             let isEqual=await bcryptjs.compare(userCredObj.password,userOfDB.password)
             //if passwords not matched
             if(isEqual===false){
                response.status(200).send({message:"Invalid password"})
             }
             //if passwords matched
             else{
                //create a JWT token
                
                let jwtToken=jwt.sign({username:userOfDB.username},"abc",{expiresIn:"1 days"})
                //send token in response
                delete userOfDB.password
                 response.status(200).send({message:"success",token:jwtToken,userId:userOfDB.userId})
             }
          }
}))

// private router
userApp.get("/test",verifyToken,(req,res)=>{
   res.send({message:"reply from private route"})
})





//export userapp
module.exports = userApp