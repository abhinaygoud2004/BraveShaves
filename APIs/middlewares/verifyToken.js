const jwt = require('jsonwebtoken')

require("dotenv").config()
const verifyToken = (request, respone, next) => {
    const bearerToken = request.headers.authorization
    if (bearerToken === undefined)
        response.send({ message: "Unauthorized access...plz login first" })
    else {
        //get token from bearer token
        const token = bearerToken.split(" ")[1]//["bearer",token]
        //verify token
        try {
            jwt.verify(token, process.env.SECRET_KEY)
            //calling next middleware
            next()
        }
        catch (err) {
            //forward error to error handling middleware
            next(new Error("Session expired.Please relogin to continue"))
        }

    }

}
module.exports=verifyToken