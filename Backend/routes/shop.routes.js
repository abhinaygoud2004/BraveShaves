const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create shop for a barber
router.post("/", authMiddleware, shopController.create);

// Get shop by barber id
router.get("/barber/:barberId", shopController.getByBarber);

// Update shop details
router.put("/:id", authMiddleware, shopController.update);

module.exports = router;
