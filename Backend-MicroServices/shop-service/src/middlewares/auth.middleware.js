const jwtUtil = require("../utils/jwt.util");

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwtUtil.verifyToken(token);

    // 🔐 Attach user info to request
    req.user = decoded;

    // console.log("🔐 JWT decoded:", decoded);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }
    next();
  };
};
