const paymentRepo = require("../repositories/payment.repository");
const appointmentRepo = require("../repositories/appointment.repository");

exports.cash = async (appointmentId, amount) => {
  // Mark payment
  const payment = await paymentRepo.create({
    appointment_id: appointmentId,
    amount,
    method: "CASH",
    status: "SUCCESS",
  });

  // Update appointment
  await appointmentRepo.confirm(appointmentId);

  return payment;
};
