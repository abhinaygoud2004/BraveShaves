const repo = require("../repositories/user.repository");
const {hashPassword,comparePassword}=require("../utils/password.utils")
const {signToken}=require("../utils/jwt.util");



exports.register = async (user) => {
  const existing = await repo.findByEmail(user.email);
  if (existing) throw new Error("User already exists");

  const hashed=await hashPassword(user.password);
  user.password=hashed;
  await repo.create(user);
};

exports.login = async ({ email, password }) => {
  const user = await repo.findByEmail(email);
  if (!user) throw new Error("Invalid email");

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) throw new Error("Invalid password");

  return{
    token:signToken({id:user.id,role:user.role}),
    user
  }
};

exports.user = async (userId) => {
  const user = await repo.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};
