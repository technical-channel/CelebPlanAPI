const mongoose = require("mongoose");
const Tags = require("./Tags");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tags",
      },
    ],
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    actualPrice: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
