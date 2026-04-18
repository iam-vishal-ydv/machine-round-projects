const User = require("../models/user.model");
const apiError = require("../utils/error");
const { generateToken } = require("../utils/jwt.utils");
const { hashPassword, comparePassword } = require("../utils/password.utils");

const registerService = async (username, email, password) => {
  username = username.trim();
  email = email.trim().toLowerCase();

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new apiError("User already exists", 409);
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};
const loginService = async (email, password) => {
  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new apiError("User not found", 404);
  }
  let isMatchPassword = await comparePassword(password, user.password);
  if (!isMatchPassword) {
    throw new apiError("Invalid credentials", 400);
  }

  let token = generateToken({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    data: { user: user.username, email: user.email, role: user.role },
  };
};

const getMeService = async (user) => {
  if (!user) {
    throw new apiError("User not found", 404);
  }
  const getUser = await User.findById(user._id).select("-password");
  return getUser;
};

module.exports = {
  registerService,
  loginService,
  getMeService,
};
