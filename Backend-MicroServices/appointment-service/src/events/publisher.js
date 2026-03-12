const { getChannel, EXCHANGE_NAME } = require("../config/rabbitmq");

exports.publishAppointmentCreated = async (payload) => {

  const channel = getChannel();

  channel.publish(
    EXCHANGE_NAME,
    "appointment.created",
    Buffer.from(JSON.stringify(payload)),
    {
      persistent: true
    }
  );

  console.log("📤 appointment.created event published", payload);

};