const mongoose = require("mongoose");

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

  upperBodyMeasure: {
    type: Map,
    of: Number,
  },
  lowerBodyMeasure: {
    type: Map,
    of: Number,
  },
  bodiceMeasure: {
    type: Map,
    of: Number,
  },
  skirtMeasure: {
    type: Map,
    of: Number,
  },
  trouserMeasure: {
    type: Map,
    of: Number,
  },
});

module.exports = mongoose.model("Measurements", measurementsSchema);
