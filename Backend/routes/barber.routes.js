const express = require("express");
const router = express.Router();

const barberController = require("../controllers/barber.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create barber profile (usually after user signup)
router.post("/", authMiddleware, barberController.create);

// Get all barbers (for shop listing)
router.get("/", barberController.list);

// Get barber by id
router.get("/:id", barberController.getById);

module.exports = router;
