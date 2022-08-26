const Hotel = require("../models/Hotel");
const Slider = require("../models/Slider");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  let { food_type, ...data } = req.body;
  if (food_type == "true") {
    food_type = true;
  } else {
    food_type = false;
  }
  console.log(typeof food_type);
  const newHotel = new Hotel({ ...data, food_type: food_type });

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Hotel
router.get("/find/:id", async (req, res) => {
  try {
    const Hotel = await Hotel.findById(req.params.id).populate("tags");
    res.status(200).json(Hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL HotelS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Hotels;

    if (qNew) {
      Hotels = await Hotel.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Hotels = await Hotel.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Hotels = await Hotel.find();
    }

    res.status(200).json(Hotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
