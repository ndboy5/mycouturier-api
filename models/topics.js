const mongoose = require("mongoose");

const topicsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    required: false,
  },
  numberOfPosts: {
    type: Number,
    required: false,
  },
  isOpen: Boolean,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "accounts",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Topics", topicsSchema);
