const jwt = require("jsonwebtoken");

exports.authenticateUser=(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log("decoded user",decoded)
    // Attach user info for downstream services
    req.headers["user_id"] = decoded.id;
    req.headers["user_role"] = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};