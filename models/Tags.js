const mongoose = require("mongoose");

const TagsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now, requuired: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tags", TagsSchema);
