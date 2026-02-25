const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointment.controller");

const {authorizeRoles} = require("../middlewares/auth.middleware")

// Create appointment (user)
router.post("/",authorizeRoles("USER") ,appointmentController.create);

// Get appointments of logged-in user
router.get("/user",authorizeRoles("USER"), appointmentController.userAppointments);

// Get appointments for a barber
router.get("/barber/:barberId",authorizeRoles("USER","BARBER"), appointmentController.barberAppointments);

// Cancel appointment
router.put("/:id/cancel",authorizeRoles("USER","BARBER"), appointmentController.cancel);

module.exports = router;