const mongoose = require("mongoose");

const measurementsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"],
  },
  forself: Boolean,
  bodysizes: {
    type: Map, 
    of: Number,
  },
  isFavourite: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Measurements", measurementsSchema);
