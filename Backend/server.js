require("dotenv").config();   // MUST be first

const app = require("./app");

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT,()=>{
  console.log(`Server running on the PORT ${PORT}`);
})