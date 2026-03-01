const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");
const {authorizeRoles} = require("../middlewares/auth.middleware");

// Create shop for a barber
router.post("/", authorizeRoles("ADMIN"), shopController.create);

// Get shop by barber id
router.get("/barber/:barberId", authorizeRoles("USER","BARBER","ADMIN"),shopController.getByBarber);

// Update shop details
router.put("/:id", authorizeRoles("BARBER","ADMIN"), shopController.update);

router.get("/",shopController.getAllShops)
module.exports = router;