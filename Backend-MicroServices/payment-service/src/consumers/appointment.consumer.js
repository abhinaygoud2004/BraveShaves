const { getChannel } = require("../config/rabbitmq");
const paymentService = require("../services/payment.service");

exports.consumeAppointmentCreated = async () => {

  const channel = getChannel();

  channel.consume("appointment_created", async (msg) => {

    if (msg !== null) {

      const data = JSON.parse(msg.content.toString());

      try {
        await paymentService.processPayment(data);
        channel.ack(msg);
      } catch (error) {
        console.error("Payment failed:", error);
      }
    }
  });
};