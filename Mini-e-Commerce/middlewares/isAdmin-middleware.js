const apiError = require("../utils/error");

const adminMiddleware = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role !== "admin") {
    throw new apiError("Access denied", 403);
  }
  next();
};

module.exports = adminMiddleware;
