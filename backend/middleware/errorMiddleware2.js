// backend/middleware/errorMiddleware.js
module.exports = (err, req, res, next) => {
  console.error(err);

  let status = err.status || 500;
  let message = err.message || "Server error";

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = err.errors.map(e => e.message).join(", ");
  }

  res.status(status).json({
    success: false,
    message,
  });
};
