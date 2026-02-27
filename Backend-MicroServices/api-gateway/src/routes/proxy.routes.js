const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const rateLimiter = require("../middlewares/rateLimiter");

const router = express.Router();

// Public routes (no auth)
router.use(
  "/users",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
  })
);

// Protected routes
router.use(
  "/shops",
  authMiddleware,
  rateLimiter,
  createProxyMiddleware({
    target: process.env.SHOP_SERVICE_URL,
    changeOrigin: true,
  })
);

router.use(
  "/appointments",
  authMiddleware,
  rateLimiter,
  createProxyMiddleware({
    target: process.env.APPOINTMENT_SERVICE_URL,
    changeOrigin: true,
  })
);

router.use(
  "/payments",
  authMiddleware,
  createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE_URL,
    changeOrigin: true,
  })
);

module.exports = router;