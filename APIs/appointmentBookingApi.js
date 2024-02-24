const exp = require("express");
const appointmentApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken");

appointmentApp.use(exp.json());

appointmentApp.post(
  "/book-appointment/:userId",
  expressAsyncHandler(async (request, response) => {
    const { barberId, selectedTime,selectedServices } = request.body;

    try {

      // Get the user and barber ID from the decoded token
      const userId = request.params.userId;

      // Get userCollectionObj and barberCollectionObj
      const userCollectionObj = request.app.get("userCollectionObj");
      const barberCollectionObj = request.app.get("barberCollectionObj");

      // Convert selectedTime,selectedServices to a JavaScript Date object
      const appointmentDate = new Date(selectedTime);

      // Book the appointment
      await userCollectionObj.updateOne(
        { userId },
        {
          $push: {
            appointments: {
              barber_id: barberId,
              appointment_date: selectedTime,
              status: "pending",
              services:selectedServices,
            },
          },
        }
      );

      await barberCollectionObj.updateOne(
  { barberId },
  {
    $push: {
      appointments: {
        user_id: userId,
        appointment_date: appointmentDate,
        status: "pending",
        services: selectedServices,
      },
    },
    $addToSet: { reservedTimes: appointmentDate }, // Add the appointment date to reservedTimes
  },
  { upsert: true } // Create a new document if no matching document is found
);

      response.status(201).send({ message: "Appointment booked successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).send({ message: "Internal server error" });
    }
  })
);

appointmentApp.get(
  "/fetch-appointments/:userId",
  expressAsyncHandler(async (request, response) => {
    try {
      // Get the user ID from the request parameters
      const userId = request.params.userId;

      // Get userCollectionObj
      const userCollectionObj = request.app.get("userCollectionObj");

      // Find the user with the specified user ID
      const user = await userCollectionObj.findOne({ userId });

      if (!user) {
        // If the user is not found, return an error response
        response.status(404).send({ message: "User not found" });
      } else {
        // If the user is found, return the appointments array
        response.status(200).send({ message: "User appointments", payload: user.appointments });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send({ message: "Internal server error" });
    }
  })
);


// private router
appointmentApp.get("/test", verifyToken, (req, res) => {
  res.send({ message: "reply from private route" });
});

//export appointmentApp
module.exports = appointmentApp;
