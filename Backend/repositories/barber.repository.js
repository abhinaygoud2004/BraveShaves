const db = require("../config/db");

exports.create = async ({ user_id, experience_years }) => {
  const [r] = await db.query(
    "INSERT INTO barbers (user_id,experience_years) VALUES (?,?)",
    [user_id, experience_years]
  );
  return { id: r.insertId, user_id, experience_years };
};

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM barbers");
  return rows;
};

exports.findById = async (id) => {
  const [[row]] = await db.query(
    "SELECT * FROM barbers WHERE id=?",
    [id]
  );
  return row;
};
