const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    hotel_name: { type: String, required: true },
    manager: { type: String, required: true },
    hotel_image: { type: String, required: true },
    mobile: { type: Number, required: true },
    start_time: { type: Date, required: true, default: new Date() },
    end_time: { type: Date, required: true, default: new Date() },
    username: { type: String, required: true },
    password: { type: String, required: true },
    hotel_address: { type: String, required: true },
    food_type: { type: Boolean, required: true },
    menu_image: { type: String, required: true },
    place: { type: String },
    extra_comments: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);
