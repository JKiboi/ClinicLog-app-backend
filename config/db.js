require("dotenv").config();
const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      
    });

    console.log('MongoDB is connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
