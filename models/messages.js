const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  text: String,
  chatRoom: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Messages", messagesSchema);
