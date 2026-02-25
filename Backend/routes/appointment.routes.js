const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create appointment (user)
router.post("/", appointmentController.create);

// Get appointments of logged-in user
router.get("/user", appointmentController.userAppointments);

// Get appointments for a barber
router.get("/barber/:barberId", appointmentController.barberAppointments);

// Cancel appointment
router.put("/:id/cancel", appointmentController.cancel);

module.exports = router;
