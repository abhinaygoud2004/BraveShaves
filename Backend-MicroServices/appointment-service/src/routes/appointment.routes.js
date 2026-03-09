const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointment.controller");

const {authorizeRoles} = require("../middlewares/auth.middleware")

// Create appointment (user)
// router.post("/",authorizeRoles("USER") ,appointmentController.create);
router.post("/",appointmentController.create);

// Get appointments of logged-in user
// router.get("/user",authorizeRoles("USER"), appointmentController.userAppointments);
router.get("/user", appointmentController.userAppointments);

// Get appointments for a barber
// router.get("/barber/:barberId",authorizeRoles("USER","BARBER"), appointmentController.barberAppointments);
router.get("/barber/:barberId", appointmentController.barberAppointments);

// Cancel appointment
router.put("/:id/cancel", appointmentController.cancel);

module.exports = router;