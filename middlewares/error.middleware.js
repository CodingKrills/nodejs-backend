const errorMiddleware = (err, req, res, next) => {
  // Log the error (optional)
  console.error(err);

  // Set the status code of the response
  let statusCode = err.statusCode || 500;

  // Prepare the error response
  let response = {
    error: {
      message: err.message || 'Internal Server Error',
    },
  };

  // Add additional error details in development mode
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  // Send the error response to the client
  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
