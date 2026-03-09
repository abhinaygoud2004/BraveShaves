const appointmentService = require("../services/appointment.service");

exports.create = async (req, res, next) => {
  try {
    const userId = req.headers["user_id"];

    console.log("services:", req.body);
    console.log("user", userId);

    const { selectedTime, selectedServices, payment_status, status } = req.body;

    const appointmentId = await appointmentService.create(
      userId,
      req.body
    );
    res.status(201).json({ appointmentId });
  } catch (err) {
    next(err);
  }
};

exports.userAppointments = async (req, res, next) => {
  try {
    const data = await appointmentService.getByUser(req.headers["user_id"]);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.barberAppointments = async (req, res, next) => {
  try {
    const data = await appointmentService.getByBarber(req.params.barberId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    await appointmentService.cancel(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
