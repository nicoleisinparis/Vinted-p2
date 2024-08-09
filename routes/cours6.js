const Offer = require("../models/Offer");

const express = require("express");

const router = express.Router();

// REGEXP
// router.get("/offers", async (req, res) => {
//   try {
//     console.log(req.query);

//     // const regex = new RegExp("tshirt","i");

//     const regex = /tshirt/i;

//     const result = await Offer.find({ product_name: regex });

//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/offers", async (req, res) => {
  try {
    const result = await Offer.find()
      .sort({ product_name: "asc" }) //
      .limit(5)
      .skip(3)
      .select("product_name product_price -_id"); //

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
