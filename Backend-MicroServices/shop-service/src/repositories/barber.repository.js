const db = require("../config/db");

exports.create = async ({ user_id, experience_years }) => {
  const [r] = await db.query(
    "INSERT INTO barbers (user_id,experience_years) VALUES (?,?)",
    [user_id, experience_years]
  );
  return { id: r.insertId, user_id, experience_years };
};

exports.findAll = async () => {
  const [rows] = await db.query("SELECT b.id,u.name,u.email,u.phone,b.experience_years,b.user_id,b.rating FROM barbers b LEFT JOIN users u on b.user_id=u.id");
  return rows;
};

exports.findById = async (id) => {
  const [[row]] = await db.query(
    "SELECT * FROM barbers b LEFT JOIN users u on b.user_id=u.id WHERE b.id=?",
    [id]
  );
  console.log("in repo ",row)
  return row;
};
