const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Cash payment (pay at shop)
router.post("/cash", authMiddleware, paymentController.cashPayment);

// (Future)
// router.post("/create-order", paymentController.createOrder);
// router.post("/verify", paymentController.verifyPayment);

module.exports = router;
