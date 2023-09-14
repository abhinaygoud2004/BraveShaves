const express = require('express');
const appointmentApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
const verifyToken = require('./middlewares/verifyToken'); // Import your authentication middleware

// Define an Appointment model/schema if using Mongoose
const AppointmentModel = require('./models/appointment');

appointmentApp.use(express.json());

// Endpoint to book an appointment
appointmentApp.post(
  '/book-appointment',
  verifyToken, // Protect this route with authentication middleware
  expressAsyncHandler(async (req, res) => {
    try {
      // Get user ID from the authenticated user's token
      const userId = req.user.id;

      // Retrieve appointment details from the request body
      const { barberId, serviceId, date, time } = req.body;

      // Check if the selected date and time are available (You should implement this logic)

      // If available, create a new appointment
      const newAppointment = new AppointmentModel({
        userId,
        barberId,
        serviceId,
        date,
        time,
      });

      // Save the appointment to the database
      await newAppointment.save();

      res.status(201).json({
        message: 'Appointment booked successfully',
        payload: newAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error booking appointment', error });
    }
  })
);

// Endpoint to update an appointment
appointmentApp.put(
  '/update-appointment/:id',
  verifyToken, // Protect this route with authentication middleware
  expressAsyncHandler(async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const userId = req.user.id; // Ensure that the user updating the appointment is the owner

      // Retrieve appointment details from the request body
      const { barberId, serviceId, date, time } = req.body;

      // Check if the appointment exists and belongs to the user
      const existingAppointment = await AppointmentModel.findById(appointmentId);

      if (!existingAppointment || existingAppointment.userId !== userId) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      // Update appointment details
      existingAppointment.barberId = barberId;
      existingAppointment.serviceId = serviceId;
      existingAppointment.date = date;
      existingAppointment.time = time;

      // Save the updated appointment
      await existingAppointment.save();

      res.status(200).json({
        message: 'Appointment updated successfully',
        payload: existingAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating appointment', error });
    }
  })
);

// Endpoint to cancel an appointment
appointmentApp.delete(
  '/cancel-appointment/:id',
  verifyToken, // Protect this route with authentication middleware
  expressAsyncHandler(async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const userId = req.user.id; // Ensure that the user canceling the appointment is the owner

      // Check if the appointment exists and belongs to the user
      const existingAppointment = await AppointmentModel.findById(appointmentId);

      if (!existingAppointment || existingAppointment.userId !== userId) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      // Delete the appointment from the database
      await AppointmentModel.findByIdAndDelete(appointmentId);

      res.status(200).json({ message: 'Appointment canceled successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error canceling appointment', error });
    }
  })
);

// Endpoint to get a user's appointments
appointmentApp.get(
  '/user-appointments',
  verifyToken, // Protect this route with authentication middleware
  expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.user.id;

      // Retrieve the user's appointments from the database
      const userAppointments = await AppointmentModel.find({ userId });

      res.status(200).json({
        message: 'User appointments',
        payload: userAppointments,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user appointments', error });
    }
  })
);

module.exports = appointmentApp;
