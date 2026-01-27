const express = require("express");
const controller = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/get-user/:userId", verifyToken, controller.getUser);
router.get("/ping", (req, res) => {
    res.send("User API working ✅");
  });

module.exports = router;
