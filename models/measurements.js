const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema(
  {
    name: String,
    size: Number,
  }
  // { _id: false }
);

const measurementsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: false,
    maxlength: 300,
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Accounts",
  },
  owner: {
    type: String,
    required: false,
    maxlength: 50,
  },
  ownerId: {
    type: mongoose.Schema.ObjectId,
    ref: "Accounts",
  },
  lastUpdateBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Accounts",
  },
  isFavourite: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastSyncTime: Date,
  lastUpdateDate: Date,
  type: {
    type: String,
    required: true,
    enum: ["Free Hand", "Pattern Drafting"],
  },
  unit: {
    type: String,
    required: true,
    enum: ["CM", "Inch", "M", "MM"],
  },

  upperBodyMeasure: [measurementSchema],
  lowerBodyMeasure: [measurementSchema],
  bodiceMeasure: [measurementSchema],
  skirtMeasure: [measurementSchema],
  trouserMeasure: [measurementSchema],
});

module.exports = mongoose.model("Measurements", measurementsSchema);
