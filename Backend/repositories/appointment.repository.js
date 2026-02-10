const db = require("../config/db");

exports.overlap = async (barberId, start, end) => {
  const [[r]] = await db.query(
    `SELECT COUNT(*) cnt FROM appointments
     WHERE barber_id=? AND status!='CANCELLED'
     AND start_time < ? AND end_time > ?`,
    [barberId, end, start]
  );
  return r.cnt > 0;
};

exports.create = async (data, conn) => {
  const [r] = await conn.query(
    `INSERT INTO appointments (user_id,barber_id,start_time,end_time)
     VALUES (?,?,?,?)`,
    [data.user_id, data.barber_id, data.start_time, data.end_time]
  );
  return r.insertId;
};

exports.attachServices = async (appointmentId, services, conn) => {
  for (const serviceId of services) {
    await conn.query(
      "INSERT INTO appointment_services (appointment_id,service_id) VALUES (?,?)",
      [appointmentId, serviceId]
    );
  }
};

exports.findByUser = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM appointments WHERE user_id=?",
    [userId]
  );
  return rows;
};

exports.findByBarber = async (barberId) => {
  const [rows] = await db.query(
    "SELECT * FROM appointments WHERE barber_id=?",
    [barberId]
  );
  return rows;
};

exports.cancel = async (id) => {
  await db.query(
    "UPDATE appointments SET status='CANCELLED' WHERE id=?",
    [id]
  );
};


exports.confirm = async (appointmentId) => {
  const [result] = await db.query(
    `UPDATE appointments
     SET status = 'CONFIRMED',
         payment_status = 'PAID'
     WHERE id = ?`,
    [appointmentId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Appointment not found or already updated");
  }

  return { appointmentId, status: "CONFIRMED" };
};