const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // log to console for dev
  /*
  console.log(err);
  console.log(err.name);
  console.log(err.code);
  */

  // testing for specific errors
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found...`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate Field Value Entered for unique Field ${error.keyValue.name}`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message =
      'Validation Error(s):' +
      Object.values(err.errors).map((val) => ' ' + val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
