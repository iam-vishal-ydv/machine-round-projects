const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(planPassword, hashPassword) {
  return await bcrypt.compare(planPassword, hashPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
