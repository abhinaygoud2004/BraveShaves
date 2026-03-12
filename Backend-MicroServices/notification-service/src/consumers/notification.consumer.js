const { getChannel } = require("../config/rabbitmq");
const transporter = require("../config/mailer");

async function startNotificationConsumer() {

  const channel = getChannel();

  const exchange = "brave.events";

  const q = await channel.assertQueue("notification.queue", {
    durable: true
  });

  await channel.bindQueue(q.queue, exchange, "appointment.created");

  channel.consume(q.queue, async (msg) => {

    try {

      const event = JSON.parse(msg.content.toString());

      console.log("📩 Sending notification for appointment:", event);

      // Validate email before sending
      if (!event.email || !event.email.includes("@")) {
        console.log("⚠️ Invalid recipient email. Skipping notification.");
        channel.ack(msg);
        return;
      }

      const mailOptions = {
        from: `"Brave Shaves" <${process.env.EMAIL_USER}>`,
        to: event.email,
        subject: "✂️ Appointment Confirmation",

        html: `
        <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:30px">

          <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

            <h2 style="color:#2c3e50;text-align:center">
              ✂️ Appointment Confirmed
            </h2>

            <p>Hello,</p>

            <p>Your appointment has been successfully booked.</p>

            <table style="width:100%;border-collapse:collapse;margin-top:15px">
              <tr>
                <td style="padding:8px;font-weight:bold">Start Time</td>
                <td style="padding:8px">
                  ${new Date(event.startTime).toLocaleString()}
                </td>
              </tr>

              <tr style="background:#f8f8f8">
                <td style="padding:8px;font-weight:bold">End Time</td>
                <td style="padding:8px">
                  ${new Date(event.endTime).toLocaleString()}
                </td>
              </tr>

              <tr>
                <td style="padding:8px;font-weight:bold">Barber ID</td>
                <td style="padding:8px">${event.barber_id}</td>
              </tr>
            </table>

            <p style="margin-top:20px">
              Please arrive 5 minutes before your appointment.
            </p>

            <div style="text-align:center;margin-top:30px">
              <a href="#"
                 style="background:#2c3e50;color:white;padding:10px 18px;text-decoration:none;border-radius:5px">
                View Appointment
              </a>
            </div>

            <p style="margin-top:30px;font-size:12px;color:#777;text-align:center">
              Brave Shaves • Smart Barber Booking
            </p>

          </div>

        </div>
        `
      };

      await transporter.sendMail(mailOptions);

      console.log("✅ Email sent successfully");

      channel.ack(msg);

    } catch (error) {

      console.error("❌ Email sending failed:", error.message);

      // Permanent errors should NOT retry
      const permanentErrors = [
        "No recipients defined",
        "Invalid recipient",
        "Invalid login",
        "BadCredentials"
      ];

      const isPermanent = permanentErrors.some(err =>
        error.message.includes(err)
      );

      if (isPermanent) {

        console.log("⚠️ Permanent error detected → dropping message");

        channel.ack(msg);

      } else {

        console.log("🔁 Temporary error → retrying message");

        channel.nack(msg, false, true);

      }

    }

  });

}

module.exports = startNotificationConsumer;