const asyncHandler = require("../config/asyncHandler");
const {
  registerService,
  loginService,
  getMeService,
} = require("../services/auth.service");
const apiError = require("../utils/error");

const registerController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new apiError("All fields required!", 400);
  }
  if (password.length <= 6) {
    throw new apiError("Min 6 character password", 422);
  }
  const newUser = await registerService(username, email, password);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      username: newUser.username,
      email: newUser.email,
    },
  });
});

const loginController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();
  if (!email || !password) {
    throw new apiError("All fields required!");
  }
  if (password.length <= 6) {
    throw new apiError("Min 6 character password", 422);
  }
  let user = await loginService(email, password);

  res.status(200).json({
    success: true,
    message: "User login successfully",
    user,
  });
});

const getMeController = asyncHandler(async (req, res) => {
  const user = req.user;

  const userService = await getMeService(user);
  res.status(200).json({
    success: true,
    message: "User get successfully",
    data: userService,
  });
});

module.exports = {
  registerController,
  loginController,
  getMeController,
};
