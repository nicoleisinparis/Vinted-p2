const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

app.use(cors());
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

// connexion a mes services
// mongoose
mongoose.connect("mongodb://localhost:27017/orion24-vinted");
// cloudinary
cloudinary.config({
  cloud_name: "dqw9lubxk",
  api_key: "485422313846785",
  api_secret: "SDDWVFdnYxMg4onHB35wy8bnTno",
});

app.use(express.json());

// salut

// import de mes routeurs
const userRouter = require("./routes/user");
const offerRouter = require("./routes/offer");
// cours 6
const cours6Router = require("./routes/cours6");

// utilisation de mes routers
app.use("/user", userRouter); // le "/user" est un préfixe qui sera ajouté à toutes les routes de userRouter
app.use(offerRouter);
app.use(cours6Router);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "all route",
  });
});

app.listen(3000, () => {
  console.log("server started");
});

// Utilisez le port défini dans le fichier .env
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
