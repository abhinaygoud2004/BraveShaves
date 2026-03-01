const transporter = require("../config/mailer");

exports.sendAppointmentConfirmation = async ({
  userId,
  appointmentId,
  startTime,
  endTime,
}) => {

  // In real system you'd fetch user email from user-service
  // For now, dummy email
  const userEmail = "test@example.com";

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Appointment Confirmed",
    text: `
      Appointment ID: ${appointmentId}
      Start: ${startTime}
      End: ${endTime}
    `,
  });

  console.log("Email sent for appointment:", appointmentId);
};