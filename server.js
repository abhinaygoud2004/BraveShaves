//create express app
const exp=require("express")
const app=exp();

const cors = require("cors")
app.use(cors());

//import userApp
const userApp=require("./APIs/usersApi")

require('dotenv').config()
//assign port number
const port=4000

//execute userApi when path starts with /user-api
app.use('/user-api',userApp)


//assign port number
app.listen(port,()=>console.log("web server lisening in port 4000..."))

const path=require("path");
//connect react build
app.use(exp.static(path.join(__dirname,'./build')))



//get mongo client
const mclient=require('mongodb').MongoClient;

//connect to db server using mongoClient
mclient.connect('mongodb://127.0.0.1:27017')
.then((dbRef)=>{
  //connect to a database
  const dbobj=dbRef.db('braveshaves')
  //connect to collections of this database
  const userCollectionObj=dbobj.collection('users')
  //share collections to APIs
  app.set('userCollectionObj',userCollectionObj)
  console.log("DB connections is successfull")
})
.catch(err=>console.log("database connect error :",err))


//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
  response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)


//invalid path
const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:"Invalid path"})
} 

app.use("*",invalidPathMiddleware)

//error handling middleware
const errhandlingMiddleware=(error,request,response,next)=>{

response.send({message:error.message})
}

app.use(errhandlingMiddleware)