const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).send({ message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).send({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // attach user/barber info to request

    next();
  } catch (err) {
    err.status = 401;
    err.message = "Invalid or expired token";
    next(err);
  }
};
