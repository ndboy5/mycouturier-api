const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  text: String,
  account: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: false,
  },
  dislikes: {
    type: Number,
    default: 0,
    required: false,
  },
  reactions: [reactionSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", postsSchema);
