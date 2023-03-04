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
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
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
      timestamp: {
        type: Date,
        required: true,
      },
      reactions: [reactionSchema],
    },
  ],
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
