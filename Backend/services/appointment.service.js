const db = require("../config/db");
const repo = require("../repositories/appointment.repository");

exports.create = async (
  userId,
  barberId,
  services,
  startTime
) => {
  const duration = services.length * 15;
  const endTime = new Date(new Date(startTime).getTime() + duration * 60000);

  const overlap = await repo.overlap(barberId, startTime, endTime);
  if (overlap) throw new Error("Slot unavailable");

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const apptId = await repo.create(
      { userId, barberId, startTime, endTime },
      conn
    );

    await repo.attachServices(apptId, services, conn);

    await conn.commit();
    return apptId;
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
};


exports.getByUser = async (userId) => {
  return appointmentRepo.findByUser(userId);
};

exports.getByBarber = async (barberId) => {
  return appointmentRepo.findByBarber(barberId);
};

exports.cancel = async (appointmentId) => {
  await appointmentRepo.cancel(appointmentId);
};