const bcrypt = require("bcrypt");

async function generateHashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hashPassword) {
  console.log(password, "tttt");

  console.log(hashPassword, "testttt");
  return await bcrypt.compare(password, hashPassword);
}

module.exports = {
  generateHashPassword,
  comparePassword,
};
