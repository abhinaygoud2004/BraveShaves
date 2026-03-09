const express = require("express");
const router = express.Router();

const barberController = require("../controllers/barber.controller");
const {authorizeRoles} = require("../middlewares/auth.middleware");

// Create barber profile (usually after user signup)
router.post("/",authorizeRoles("ADMIN"), barberController.create);

// Get all barbers (for shop listing)
// router.get("/",authorizeRoles("USER","BARBER","ADMIN"), barberController.list);
router.get("/", barberController.list);

// Get barber by id
// router.get("/:id",authorizeRoles("USER","BARBER","ADMIN"), barberController.getById);
router.get("/:id", barberController.getById);

module.exports = router;
