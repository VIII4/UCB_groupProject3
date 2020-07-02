require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const formData = require("express-form-data");

//Load Routes
const usersRouter = require("./routes/users");
const issueRouter = require("./routes/issue");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true })); ////allows us to determine route
app.use(express.json()); ///allows us to parse json
app.use(formData.parse()); // allows us to parse form data

// Set up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
// var MONGODB_URI =
//   process.env.MONGODB_URI ||
//   "mongodb://carenUser:groupProject3@ds145208.mlab.com:45208/heroku_kgv68jn2";
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/caren";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log("Database error occurred");
  })
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => console.log(err));

//Listen for routes
app.use("/users", usersRouter);
app.use("/issue", issueRouter);
app.post("/image-upload", (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map((image) =>
    cloudinary.uploader.upload(image.path)
  );

  Promise.all(promises)
    .then((results) => {
      let images = [];
      results.map((data) => images.push(data.secure_url));
      res.json(images);
    })
    .catch((err) => console.log(err));
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
