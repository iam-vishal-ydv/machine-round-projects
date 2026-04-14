const mongoose = require("mongoose");

async function connectDB(url) {
  try {
    const db = await mongoose.connect(url);
    console.log(` Database connect  successfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
