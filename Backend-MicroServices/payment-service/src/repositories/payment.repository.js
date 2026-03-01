const pool = require("../config/db");

exports.create = async (payment) => {
  await pool.execute(
    `INSERT INTO payments 
     (id, appointment_id, user_id, amount, status)
     VALUES (?, ?, ?, ?, ?)`,
    [
      payment.id,
      payment.appointment_id,
      payment.user_id,
      payment.amount,
      payment.status
    ]
  );
};

exports.updateStatus = async (id, status) => {
  await pool.execute(
    "UPDATE payments SET status = ? WHERE id = ?",
    [status, id]
  );
};