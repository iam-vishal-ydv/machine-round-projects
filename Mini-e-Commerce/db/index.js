const mongoose = require("mongoose");

async function connectDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Database run successfully ");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
