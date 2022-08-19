const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    tittle: { type: String, required: true },
    desc: { type: String, required: true },
    bg: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", SliderSchema);
