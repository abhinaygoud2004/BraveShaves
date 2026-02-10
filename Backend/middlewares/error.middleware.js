module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Authentication errors
  if (
    err.message === "Invalid username" ||
    err.message === "Invalid password" ||
    err.message === "Invalid username or password"
  ) {
    statusCode = 401;
    message = "Invalid username or password";
  }

  // User already exists
  if (err.message === "User already exists") {
    statusCode = 409;
  }

  // User not found
  if (err.message === "User not found") {
    statusCode = 404;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
