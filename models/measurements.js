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
   clothingStyle: {
    type: Array, 
    of: String,
  }, entries: {
    type: Map, 
    of: Number,
  },
  createdBy:{
    type: mongoose.Schema.ObjectId,
    ref:'Accounts'
  },
  lastupdateBy: {
type: mongoose.Schema.ObjectId,
ref: 'Accounts'
  },
  isFavourite: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastSyncTime: Date,
    lastUpdateDate:Date,
});

module.exports = mongoose.model("Measurements", measurementsSchema);