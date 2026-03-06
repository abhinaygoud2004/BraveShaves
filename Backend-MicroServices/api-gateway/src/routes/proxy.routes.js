const express = require("express");
const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");

const router = express.Router();

const createProxy = (target, serviceName) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq: fixRequestBody,
    // Use a function to manually reconstruct the path
    pathRewrite: (path, req) => {
      // Incoming 'path' here is likely just '/register' or '/health'
      // We force it to become '/api/users/register' etc.
      const rewrittenPath = `/api/${serviceName}${path}`;
      console.log(`[Proxy] Rewriting ${path} -> ${rewrittenPath}`);
      return rewrittenPath;
    },
    logLevel: "debug",
  });

// Important: Pass the service name (users, shops, appointments)
router.use("/users", createProxy(process.env.USER_SERVICE_URL, "users"));
router.use("/shops", createProxy(process.env.SHOP_SERVICE_URL, "shops"));
router.use("/appointments", createProxy(process.env.APPOINTMENT_SERVICE_URL, "appointments"));
router.use("/barbers", createProxy(process.env.SHOP_SERVICE_URL, "barbers"));
router.use("/services",createProxy(process.env.SHOP_SERVICE_URL,"services"));

module.exports = router;