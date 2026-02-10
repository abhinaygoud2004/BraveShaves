const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create appointment (user)
router.post("/", authMiddleware, appointmentController.create);

// Get appointments of logged-in user
router.get("/user", authMiddleware, appointmentController.userAppointments);

// Get appointments for a barber
router.get("/barber/:barberId", authMiddleware, appointmentController.barberAppointments);

// Cancel appointment
router.put("/:id/cancel", authMiddleware, appointmentController.cancel);

module.exports = router;
