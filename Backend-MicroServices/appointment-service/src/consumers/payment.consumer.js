const { getChannel } = require("../config/rabbitmq");
const repo = require("../repositories/appointment.repository");

exports.consumePaymentCompleted = async () => {

  const channel = getChannel();

  channel.consume("payment_completed", async (msg) => {

    if (msg !== null) {

      const data = JSON.parse(msg.content.toString());

      try {
        await repo.updatePaymentStatus(
          data.appointmentId,
          data.status
        );

        channel.ack(msg);

        console.log("Appointment updated after payment:", data.appointmentId);

      } catch (error) {
        console.error("Failed to update appointment:", error);
      }
    }
  });
};