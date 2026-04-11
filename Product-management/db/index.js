const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function databaseConnect() {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = databaseConnect;
