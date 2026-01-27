const repo = require("../repositories/appointment.repository");

exports.bookAppointment = async (appointment) => {
  appointment.status = "Pending";
  appointment.createdAt = new Date();
  await repo.create(appointment);
};

exports.getUserAppointments = async (userId) => {
  return await repo.findByUserId(userId);
};

exports.getBarberAppointments = async (barberId) => {
  return await repo.findByBarberId(barberId);
};

exports.updateStatus = async (appointmentId, status) => {
  const updated = await repo.updateStatus(appointmentId, status);
  if (!updated.matchedCount) throw new Error("Appointment not found");
};
