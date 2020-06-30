const express = require("express");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const mongodb = require("mongodb")
const routes = require("./routes");
const app = express();
const bodyParser = require('body-parser');
const User = require("./models/user.js");
const { json } = require("express");
// const userDB = require("userDB")
// const PORT = process.env.PORT || 3001;


const PORT = process.env.PORT || 5004;
// Define middleware here
app.use(express.urlencoded({ extended: true })); ////allows us to determine route
app.use(express.json()); ///allows us to parse json




//Auth 

app.route('/add').post((req, res) => {
    console.log(req.body, "req") ;               ///app incoming post request.usersname is part of request body
    // console.log(res, "res")
    const username = req.body.username;
    console.log(username, "username") ;
    const password = req.body.password;
    console.log(password, "password") ;
    
    
    //salt the password 12 times
    const BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
      //posts username and hashed password to usersDB in mongoDB
      console.log(hashedPassword)
      const newUser = new User({username, hashedPassword});
      console.log(newUser, "newUser") ;
        return newUser.save();
    })
    .then(function() {
        res.sendStatus(200);
        
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        res.json(error)
    });
  
    // newUser.save()             ////save method.
    //   .then(() => res.json('User added!'))  //after user is saved, send msg 'user'added'
    //   .catch(err => res.status(400).json('Error: ' + err));
  });

  app.route('/login').post((req, res) => { 
    
    
    console.log(req.json, "req")
    console.log(res.json, "res")
    const username = req.body.username;
    console.log(username, "username")
    const password = req.body.hashedPassword;
    console.log(password, "password")
  //pulls user data by username from usersDB
  userdb.users.findOne()
  console.log(username, "username2")
      .then(function(user) {
        console.log(user.password) ;
        //bcrypt then compares the hased passwords
          return bcrypt.compare(password, user.password); 
      })
      .then(function(samePassword) {
        //if wrong send 403
          if(!samePassword) {
              res.sendStatus(403)
          }
        //if right send 200
          res.sendStatus(200);
      })
      .catch(function(error){
          console.log("Error authenticating user: ");
          console.log(error);
      });
  });





// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
//app.use(routes);

// Connect to the Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/caren";


// app.use("/users", usersRouter);
// app.use("/issue", issueRouter);

//From old master
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/caren");

var MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost/userdb";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    // console.log("Database error occurred");
  })
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => console.log(err));

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});