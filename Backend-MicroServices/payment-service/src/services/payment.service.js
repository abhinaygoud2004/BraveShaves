const { v4: uuidv4 } = require("uuid");
const repo = require("../repositories/payment.repository");
const { getChannel } = require("../config/rabbitmq");

exports.processPayment = async (eventData) => {

  const paymentId = uuidv4();

  // Simulated amount (you could calculate properly)
  const amount = 500;

  const payment = {
    id: paymentId,
    appointment_id: eventData.appointmentId,
    user_id: eventData.userId,
    amount,
    status: "SUCCESS"
  };

  await repo.create(payment);

  // Emit payment completed event
  const channel = getChannel();

  channel.sendToQueue(
    "payment_completed",
    Buffer.from(JSON.stringify({
      paymentId,
      appointmentId: eventData.appointmentId,
      status: "SUCCESS"
    }))
  );

  console.log("Payment processed for appointment:", eventData.appointmentId);
};