const repo = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (user) => {
  const existing = await repo.findByUsername(user.username);
  if (existing) throw new Error("User already exists");

  user.password = await bcrypt.hash(user.password, 5);
  await repo.create(user);
};

exports.loginUser = async ({ username, password }) => {
  const user = await repo.findByUsername(username);
  if (!user) throw new Error("Invalid username");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1d" });
  delete user.password;

  return { message: "success", token, userId: user.userId };
};

exports.getUser = async (userId) => {
  const user = await repo.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};
