const asyncHandler = require("../config/asyncHandler");
const apiError = require("../utils/error");
const { verifyToken } = require("../utils/jwt.utils");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  let token = "";
  if (header && header.startsWith("Bearer")) {
    token = header.split(" ")[1];
  }
  if (!token) {
    throw new apiError(" Missing token ", 401);
  }
  const decode = verifyToken(token);
  req.user = decode;

  next();
});

module.exports = authMiddleware;
