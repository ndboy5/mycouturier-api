const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  text: String,
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  chatRoom: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Messages", messagesSchema);
