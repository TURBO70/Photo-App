const mongoose = require("mongoose");

module.exports.db = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/photoApp").then(() => {
    console.log("Database connected");
  }).catch((error) => {
    console.error("Database connection error:", error);
  });
};
