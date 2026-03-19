const app = require("./src/app");
const { connectDB } = require("./src/config/db");

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await connectDB(); // 🔥 connect Mongo first

    app.listen(PORT, () => {
      console.log(`User Service running on ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();