const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  emailConfirm: {
    type: Boolean,
    default: false,
  },
  age: Number,
  pic_url: {
    type: String,
    default: "user.png",
  },
});
module.exports= mongoose.model("User", userSchema);