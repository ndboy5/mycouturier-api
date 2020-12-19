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
    enum: ["Inch", "cm", "mm", "Meter"]
  },
  entries: {
    type: Map,
    of: Number
  },
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
