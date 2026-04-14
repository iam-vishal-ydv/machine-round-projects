const asyncHandler = require("../config/catchAsyncError");
const ApiError = require("../config/error");
const User = require("../models/user-model");
const {
  generateHashPassword,
  comparePassword,
} = require("../utils/generatePassword");
const { generateToken } = require("../utils/generateToken");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log(email);

  if (!username || !email || !password) {
    throw new ApiError("All fields are required", 400);
  }
  const exists = await User.findOne({ email }).select("+password");
  console.log(exists);
  if (exists) {
    throw new ApiError("Email is already exists", 409);
  }

  const hashPassword = await generateHashPassword(password);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    success: true,
    message: "User register successfully",
    data: {
      username: user.username,
      email: user.email,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError("Invalid Credentials", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError("user not found", 404);
  }

  const isMatchPassword = await comparePassword(password, user.password);

  if (!isMatchPassword) {
    throw new ApiError(" Invalid credentails", 401);
  }
  const token = generateToken({ _id: user._id });
  res.status(200).json({
    success: true,
    message: "Login successfully",
    token,
  });
});

module.exports = {
  register,
  login,
};
