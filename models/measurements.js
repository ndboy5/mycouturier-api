/*
  This is the measurements model where the body dimensions entered by the user is stored.
  The parts were deduced from the following website: https://blog.treasurie.com/sewing-measurements-for-sewing/
  Note: other measured parts may be added from the client interface
*/
const mongoose = require("mongoose");

const measurementsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 30,
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"],
  },
  unitOfMeasure: {
    type: String,
    required: true,
    enum: ["Inches", "Centimeters", "Millimeters", "Meters"]
  },
  bust: Number,
  highBust: Number,
  waist: Number,
  centerBack: Number,
  crotchLength: Number,
  hip: Number,
  inseam: Number,
  outseam: Number,
  shoulder: Number,
  ankle: Number,
  neck: Number,
  wrist: Number,
  fullHeight: Number,
  isFavourite: Boolean,
  lastupdate: {
    type: Date,
    default: Date.now,
  },
  lastupdateBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'accounts',
        require: false
    },
});

module.exports = mongoose.model("Measurements", measurementsSchema);
