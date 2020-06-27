const express = require("express");

const mongoose = require("mongoose");
//const routes = require("./routes");
const usersRouter = require("./routes/users");
const issueRouter = require("./routes/issue");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true })); ////allows us to determine route
app.use(express.json()); ///allows us to parse json

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
//app.use(routes);

// Connect to the Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/caren";

var MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://carenUser:groupProject3@ds145208.mlab.com:45208/heroku_kgv68jn2";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log("Database error occurred");
  })
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => console.log(err));

app.use("/users", usersRouter);
app.use("/issue", issueRouter);

//From old master
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/caren");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
