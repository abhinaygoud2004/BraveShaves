const db = require("../config/db");
const repo = require("../repositories/appointment.repository");

/**
 * Create Appointment
 * Controller sends:
 * {
 *   user_id,
 *   barber_id,
 *   selectedTime,
 *   selectedServices
 * }
 */
exports.create = async (data) => {
  const {
    user_id,
    selectedTime,
    selectedServices,
    payment_status,
    status
  } = data;

  if (!user_id) throw new Error("User ID is required");
  if (!selectedTime) throw new Error("Start time is required");

  if (!selectedServices || selectedServices.length === 0) {
    throw new Error("At least one service must be selected");
  }

  // ✅ Derive barber_id from first service
  const barber_id = selectedServices[0].barber_id;

  if (!barber_id) {
    throw new Error("Barber ID missing in selected services");
  }

  // ✅ Calculate total duration
  const totalDurationMinutes = selectedServices.reduce(
    (total, service) =>
      total + Number(service.duration_minutes || 0),
    0
  );

  if (totalDurationMinutes <= 0) {
    throw new Error("Invalid service duration");
  }

  const startTime = new Date(selectedTime);
  const endTime = new Date(
    startTime.getTime() + totalDurationMinutes * 60000
  );

  const overlap = await repo.overlap(barber_id, startTime, endTime);
  if (overlap) {
    throw new Error("Slot unavailable");
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const appointmentId = await repo.create(
      {
        user_id,
        barber_id,
        start_time: startTime,
        end_time: endTime,
        payment_status: payment_status || "PENDING",
        status: status || "PENDING",
      },
      conn
    );

    const serviceIds = selectedServices.map(
      (service) => service.id
    );

    await repo.attachServices(
      appointmentId,
      serviceIds,
      conn
    );

    await conn.commit();

    return appointmentId;

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};


/**
 * Get appointments by user
 */
exports.getByUser = async (userId) => {
  return repo.findByUser(userId);
};


/**
 * Get appointments by barber
 */
exports.getByBarber = async (barber_id) => {
  return repo.findByBarber(barber_id);
};


/**
 * Cancel appointment
 */
exports.cancel = async (appointmentId) => {
  return repo.cancel(appointmentId);
};