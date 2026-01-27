module.exports = (req, res, next) => {
    res.status(404).send({
      success: false,
      message: "API not found",
    });
  };
  