const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

const Razorpay = require("razorpay");

router.post("/payment", async (req, res) => {
  console.log(req.body);
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_eVRS5njVeY6cYm",
      key_secret: "olbUFOO6jWIlQDABkZd6BZqx",
    });

    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");
    else {
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
