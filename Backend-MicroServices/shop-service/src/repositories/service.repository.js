const db = require("../config/db");

exports.create = async ({ barber_id, name, price, duration_minutes }) => {
  const [r] = await db.query(
    "INSERT INTO services (barber_id,name,price,duration_minutes) VALUES (?,?,?,?)",
    [barber_id, name, price, duration_minutes]
  );
  return { id: r.insertId };
};

exports.findByBarber = async (barberId) => {
  const [rows] = await db.query(
    "SELECT * FROM services WHERE barber_id=?",
    [barberId]
  );
  return rows;
};

exports.update = async (id, data) => {
  await db.query(
    "UPDATE services SET name=?, price=?, duration_minutes=? WHERE id=?",
    [data.name, data.price, data.duration_minutes, id]
  );
};

exports.remove = async (id) => {
  await db.query("DELETE FROM services WHERE id=?", [id]);
};
