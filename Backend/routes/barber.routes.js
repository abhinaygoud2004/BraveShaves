const express = require("express");
const controller = require("../controllers/barber.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", controller.registerBarber);
router.post("/login", controller.loginBarber);
router.get("/get-allBarbers", verifyToken, controller.getAllBarbers);
router.get("/:barberId", verifyToken, controller.getBarberById);

module.exports = router;
