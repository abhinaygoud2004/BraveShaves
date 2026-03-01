const { getChannel } = require("../config/rabbitmq");

exports.publishAppointmentCreated = async (data) => {
  const channel = getChannel();
  channel.sendToQueue(
    "appointment_created",
    Buffer.from(JSON.stringify(data))
  );
};

