const mongoose = require("mongoose");

const { Schema } = mongoose;

const photoSchema = new Schema({
  path: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  up: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  down: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  count: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Photos", photoSchema);
