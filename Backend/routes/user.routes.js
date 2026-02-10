const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", userMiddleware, userController.user);

module.exports = router;
