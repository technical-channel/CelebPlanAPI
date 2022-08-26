const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const tagsRoute = require("./routes/tags");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const sliderRoute = require("./routes/Slider");
const hotelRoute = require("./routes/hotel");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/tags", tagsRoute);
app.use("/api/hotel", hotelRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running on!" + process.env.PORT);
});
