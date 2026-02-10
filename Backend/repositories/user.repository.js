const db  = require("../config/db");

exports.create=async(user)=>{
  const [res]=await db.query(
    "INSERT INTO users (name,email,phone,password_hash,role) VALUES (?,?,?,?,?)",
    [user.name,user.email,user.phone,user.password,user.role]
  );
  return {res};
};

exports.findByEmail=async(email)=>{
  const [[row]]=await db.query(
    "SELECT * FROM users where email=?",
    [email]
  );
  return row;
};

exports.findById = async (id) => {
  console.log(id)
  const [[row]] = await db.query(
    "SELECT * FROM users WHERE id=?",
    [id]
  );
  return row;
};