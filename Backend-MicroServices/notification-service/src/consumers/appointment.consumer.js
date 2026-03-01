const { getChannel } = require("../config/rabbitmq");
const emailService = require("../services/email.service");

exports.consumeAppointmentCreated = async () => {
  const channel = getChannel();

  channel.consume("appointment_created", async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());

      console.log("Received event:", data);

      try {
        await emailService.sendAppointmentConfirmation(data);

        channel.ack(msg);
      } catch (error) {
        console.error("Email failed:", error);
      }
    }
  });
};