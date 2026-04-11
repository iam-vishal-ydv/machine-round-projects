function errorMiddlewre(err, req, res, next) {
  err.message = err.message || "Someting went wrong !";
  err.stausCode = err.stausCode || 500;
  res.status(err.stausCode).json({
    success: false,
    message: err.message,
  });
}

module.exports = errorMiddlewre;
