const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const {authenticateUser} = require("../middlewares/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authenticateUser, userController.userById);
router.get("/health", userController.health);
module.exports = router;