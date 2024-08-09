const express = require("express");

const fileupload = require("express-fileupload");

const cloudinary = require("cloudinary").v2;

const Offer = require("../models/Offer");

const User = require("../models/User");

const router = express.Router();

// import de mon middleware
const isAuthenticated = require("../middlewares/isAuthenticated");

// fonction formatage image

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post(
  "/offer/publish",
  fileupload(),
  isAuthenticated,
  async (req, res) => {
    try {
      // --------------------- MIDDLEWARE
      // console.log(req.headers.authorization.replace("Bearer ", ""));
      // const token = req.headers.authorization.replace("Bearer ", "");

      // const user = await User.findOne({ token: token });

      // if (!user) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }

      // --------------------- MIDDLEWARE

      // console.log(req.body);
      // req.body -->
      const { title, description, price, condition, city, brand, size, color } =
        req.body;

      const newOffer = new Offer({
        product_name: title,
        product_description: description,
        product_price: price,
        product_details: [
          {
            MARQUE: brand,
          },
          {
            TAILLE: size,
          },
          {
            ÉTAT: condition,
          },
          {
            COULEUR: color,
          },
          {
            EMPLACEMENT: city,
          },
        ],
        // product_image: Object,
        owner: req.user._id,
      });

      const result = await cloudinary.uploader.upload(
        convertToBase64(req.files.picture)
      );

      // console.log(result);

      // j'ajoute les infos de mon image dans newOffer
      newOffer.product_image = result;

      // console.log(newOffer);

      await newOffer.save();

      // répondre :

      const responseObj = {
        product_name: title,
        product_description: description,
        product_price: price,
        product_details: [
          {
            MARQUE: brand,
          },
          {
            TAILLE: size,
          },
          {
            ÉTAT: condition,
          },
          {
            COULEUR: color,
          },
          {
            EMPLACEMENT: city,
          },
        ],
        product_image: result,
        owner: {
          account: req.user.account,
          _id: req.user._id,
        },
      };

      // console.log(responseObj);

      return res.status(201).json(responseObj);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
