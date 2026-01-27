const service = require("../services/appointment.service");

exports.bookAppointment = async (req, res, next) => {
  try {
    await service.bookAppointment(req.body);
    res.status(201).send({ message: "Appointment booked successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getUserAppointments = async (req, res, next) => {
  try {
    const data = await service.getUserAppointments(req.params.userId);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.getBarberAppointments = async (req, res, next) => {
  try {
    const data = await service.getBarberAppointments(req.params.barberId);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    await service.updateStatus(req.params.appointmentId, req.body.status);
    res.send({ message: "Appointment status updated" });
  } catch (err) {
    next(err);
  }
};
