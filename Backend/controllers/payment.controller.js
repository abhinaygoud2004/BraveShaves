const paymentService = require("../services/payment.service");

exports.cashPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.cash(
      req.body.appointment_id,
      req.body.amount
    );
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};
