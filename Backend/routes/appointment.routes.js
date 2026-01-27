const express = require("express");
const controller = require("../controllers/appointment.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/book", verifyToken, controller.bookAppointment);
router.get("/user/:userId", verifyToken, controller.getUserAppointments);
router.get("/barber/:barberId", verifyToken, controller.getBarberAppointments);
router.put("/status/:appointmentId", verifyToken, controller.updateStatus);

module.exports = router;
