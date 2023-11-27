const exp = require("express")
const barberApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require("./middlewares/verifyToken")
const multerObj=require("./middlewares/cloudinaryConfig")

barberApp.use(exp.json());

barberApp.get('/get-allBarbers',
  expressAsyncHandler(async (request, response) => {
    // Get barberCollectionObj
    const barberCollectionObj = request.app.get("barberCollectionObj");

    // Find all barbers in the collection
    const allBarbers = await barberCollectionObj.find().toArray();

    if (!allBarbers || allBarbers.length === 0) {
      // If no barbers are found, return an empty array
      response.status(404).send({ message: "No barbers found" });
    } else {
      // If barbers are found, return the array of barbers
      response.status(200).send({ message: "All barbers", payload: allBarbers });
    }
  })
);

barberApp.get('/get-barber/:barberId',
  expressAsyncHandler(async (request, response) => {
    // Get the barber ID from the URL parameters
    const barberId = request.params.barberId;

    // Get barberCollectionObj
    const barberCollectionObj = request.app.get("barberCollectionObj");

    // Find the barber with the specified barber ID
    let barber = await barberCollectionObj.findOne({ barberId });
    // console.log(barber)
    if (!barber) {
      // If the barber is not found, return an error response
      response.status(404).send({ message: "barber not found" });
    } else {
      // If the barber is found, return the barber data
      response.status(200).send({ message: "barber data", payload: barber });
    }
  })
);

barberApp.post("/register",
    expressAsyncHandler(async (request, response) => {
        //get barberCollectionObj
        const barberCollectionObj = request.app.get("barberCollectionObj")
        //get newbarber from request
        const newbarber = request.body

        //check for duplicate barber by barbername
        let barberOfDB = await barberCollectionObj.findOne({ barbername: newbarber.barbername })
        //if barber already existed,send res to client as "barber already existed"
        if (barberOfDB != null) {
            response.status(200).send({ message: "barber already existed" })
        }
        //if barber not existed
        else {


            //add CDN link of cloudinary image to barber boj
            // newbarber.Image = request.file.path;

            //hash the password
            let hashedPassword = await bcryptjs.hash(newbarber.password, 5)
           
            //replace plain password with hashed password
            newbarber.password = hashedPassword;
            //insert barber

            await barberCollectionObj.insertOne(newbarber)
            //send response
            response.status(201).send({ message: "barber created" })
        }
    }))

barberApp.post('/login',expressAsyncHandler(async(request,response)=>{
        //get barberCollectionObj
        const barberCollectionObj=request.app.get("barberCollectionObj")

          //get barber credentials from request
          const barberCredObj=request.body;
          //verify barbername
          let barberOfDB=await barberCollectionObj.findOne({barbername:barberCredObj.barbername})
          
          //if barbername if invalid
          if(barberOfDB===null){
            response.status(200).send({message:"Invalid barbername"})
          }
          //if barbername is valid
          else{
             //verify password
             //hash the password
             let isEqual=await bcryptjs.compare(barberCredObj.password,barberOfDB.password)
             //if passwords not matched
             if(isEqual===false){
                response.status(200).send({message:"Invalid password"})
             }
             //if passwords matched
             else{
                //create a JWT token
                
                let jwtToken=jwt.sign({barbername:barberOfDB.barbername},"abc",{expiresIn:"1 days"})
                //send token in response
                delete barberOfDB.password
                 response.status(200).send({message:"success",token:jwtToken,barberId:barberOfDB.barberId})
             }
          }
}))

// private router
barberApp.get("/test",verifyToken,(req,res)=>{
   res.send({message:"reply from private route"})
})

//export barberapp
module.exports = barberApp