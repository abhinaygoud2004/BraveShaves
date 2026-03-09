const db = require("../config/db");

exports.overlap = async (barberId, start, end) => {
  const [[r]] = await db.query(
    `SELECT COUNT(*) cnt 
     FROM appointments
     WHERE barber_id = ?
     AND status IN ('PENDING','CONFIRMED')
     AND start_time < ?
     AND end_time > ?`,
    [barberId, end, start]
  );

  return r.cnt > 0;
};

exports.create = async (data, conn) => {
  const [r] = await conn.query(
    `INSERT INTO appointments 
     (user_id, barber_id, start_time, end_time, payment_status, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.barber_id,
      data.start_time,
      data.end_time,
      data.payment_status || "PENDING",
      data.status || "PENDING",
    ]
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
    `
    SELECT a.*, aps.service_id
    FROM appointments a
    LEFT JOIN appointment_services aps ON a.id = aps.appointment_id
    WHERE a.user_id = ?
    ORDER BY a.start_time DESC
    `,
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
    `UPDATE appointments 
     SET status='CANCELLED',
         payment_status='REFUNDED'
     WHERE id=?`,
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

exports.updatePaymentStatus = async (appointmentId, status) => {
  await pool.execute(
    `UPDATE appointments 
     SET payment_status = ?, status = 'CONFIRMED'
     WHERE id = ?`,
    [status, appointmentId]
  );
};