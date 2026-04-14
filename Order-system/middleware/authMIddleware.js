const asyncHandler = require("../config/catchAsyncError");
const { verifyToken } = require("../utils/generateToken");
const ApiError = require("../config/error");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const headers = req.headers.authorization;
  let token = "";
  if (headers && headers.startsWith("Bearer")) {
    token = headers.split(" ")[1];
  }
  if (!token) {
    throw new ApiError("Missing token", 401);
  }
  const decode = verifyToken(token);
  req.userId = decode._id;
  next();
});

module.exports = authMiddleware;
