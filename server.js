const express = require("express");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const bodyParser = require('body-parser');
// const userDB = require("userDB")
const PORT = process.env.PORT || 3001;

//Authentication
//parse as json
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
//salt the password 12 times
var BCRYPT_SALT_ROUNDS = 12;
//Uses the request from the login field and registers in DB
app.post('/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
//Bcrypt hashes password
  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
      //posts username and hashed password to usersDB in mongoDB
        return userDB.saveUser(username, hashedPassword);
    })
    .then(function() {
        res.send();
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        next();
    });
});
//Route to login takes username and password as requests
app.post('/login', function (req, res, next) { 
  var username = req.body.username;
  var password = req.body.password;
//pulls user data by username from usersDB
  userDB.getUserByUsername(username)
    .then(function(user) {
      //bcrypt then compares the hased passwords
        return bcrypt.compare(password, user.password);
    })
    .then(function(samePassword) {
      //if wrong send 403
        if(!samePassword) {
            res.status(403).send();
        }
      //if right send 200
        res.send(200);
    })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
});

// Define middleware here
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/27017");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});