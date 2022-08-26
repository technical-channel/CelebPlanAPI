const Tags = require("../models/Tags");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  var bool_value = req.body.status == "true" ? true : false;

  const newTags = new Tags({
    name: req.body.name,
    status: bool_value,
    createdAt: req.body.createdAt,
  });

  try {
    const savedTags = await newTags.save();
    res.status(200).json(savedTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedTags = await Tags.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Tags.findByIdAndDelete(req.params.id);
    res.status(200).json("Tags has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Tags
router.get("/find/:id", async (req, res) => {
  try {
    const Tags = await Tags.findById(req.params.id);
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL TagsS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Tagss;

    if (qNew) {
      Tagss = await Tags.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Tagss = await Tags.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Tagss = await Tags.find();
    }

    res.status(200).json(Tagss);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
