const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(process.env.MONGODB_URL);
    console.log("Connected to db");
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
