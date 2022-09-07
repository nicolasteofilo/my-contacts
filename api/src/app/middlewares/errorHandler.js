const { AppError } = require('../../errors/AppError');

module.exports = (err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
}
