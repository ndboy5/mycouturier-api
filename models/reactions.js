const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.ObjectId,
    ref: "accounts",
    required: true,
  },
});

module.exports = mongoose.model("Reactions", reactionSchema);