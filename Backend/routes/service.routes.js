const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Add service (barber only)
router.post("/", authMiddleware, serviceController.create);

// Get services by barber
router.get("/barber/:barberId", serviceController.listByBarber);

// Update service
router.put("/:id", authMiddleware, serviceController.update);

// Delete service
router.delete("/:id", authMiddleware, serviceController.remove);

module.exports = router;
