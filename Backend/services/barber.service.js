const repo = require("../repositories/barber.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerBarber = async (barber) => {
  const existing = await repo.findByUsername(barber.username);
  if (existing) throw new Error("Barber already exists");

  barber.password = await bcrypt.hash(barber.password, 5);
  await repo.create(barber);
};

exports.loginBarber = async ({ username, password }) => {
  const barber = await repo.findByUsername(username);
  if (!barber) throw new Error("Invalid username");

  const isValid = await bcrypt.compare(password, barber.password);
  if (!isValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { username, role: "barber" },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  delete barber.password;

  return { message: "success", token, barberId: barber.barberId };
};

exports.getAllBarbers = async () => {
  return await repo.findAll();
};

exports.getBarberById = async (barberId) => {
  const barber = await repo.findById(barberId);
  if (!barber) throw new Error("Barber not found");
  return barber;
};
