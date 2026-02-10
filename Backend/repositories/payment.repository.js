const db = require("../config/db");

exports.create = async ({ appointment_id, amount, method, status }) => {
  const [r] = await db.query(
    `INSERT INTO payments (appointment_id,amount,method,status)
     VALUES (?,?,?,?)`,
    [appointment_id, amount, method, status]
  );
  return { id: r.insertId };
};
