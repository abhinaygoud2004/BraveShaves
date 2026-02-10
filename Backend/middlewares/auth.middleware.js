const jwtUtil = require("../utils/jwt.util");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwtUtil.verifyToken(token);

    // 🔐 Attach user info to request
    req.user = decoded;

    console.log("🔐 JWT decoded:", decoded);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
