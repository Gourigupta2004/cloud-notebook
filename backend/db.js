const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    if (!mongoURI) {
      console.error("❌ MONGO_URI is missing");
      process.exit(1);
    }
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000, // helpful for clear timeouts
    });
    console.log("✅ Connected to MongoDB (Atlas)");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error(error); // log the full error object for debugging
    process.exit(1); // let Render restart; keeps logs clean
  }
};

module.exports = connectToMongo;
