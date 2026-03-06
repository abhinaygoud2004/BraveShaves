const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/service.controller");
const {authorizeRoles} = require("../middlewares/auth.middleware");

// Add service (barber only)
router.post("/", authorizeRoles("BARBER"), serviceController.create);

// Get services by barber
// router.get("/barber/:barberId", authorizeRoles("USER","BARBER","ADMIN"),serviceController.listByBarber);
router.get("/barber/:barberId",serviceController.listByBarber);

// Update service
router.put("/:id", authorizeRoles("BARBER"), serviceController.update);

// Delete service
router.delete("/:id",authorizeRoles("BARBER"), serviceController.remove);

module.exports = router;
