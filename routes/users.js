const router = require("express").Router();
const userController = require("../controllers/userController");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth.js")
const User = require("../models/users.js");
// Process  with "/user/" in userController file
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

//process with  "/user/:id"  in userController file
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

//Auth 
router.route('/add').post((req, res) => {
  console.log(req.body, "req"); ///app incoming post request.usersname is part of request body
  // console.log(res, "res")
  const username = req.body.username;
  console.log(username, "username");
  const password = req.body.password;
  console.log(password, "password");

  //salt the password 12 times
  const BCRYPT_SALT_ROUNDS = 12;
  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then(function (hashedPassword) {
      //posts username and hashed password to usersDB in mongoDB
      console.log(hashedPassword)
      const newUser = new User({
        username,
        hashedPassword
      });
      console.log(newUser, "newUser");
      return newUser.save();
    })
    .then(function () {
      res.sendStatus(200);

    })
    .catch(function (error) {
      console.log("Error saving user: ");
      console.log(error);
      res.json(error)
    });

  // newUser.save()             ////save method.
  //   .then(() => res.json('User added!'))  //after user is saved, send msg 'user'added'
  //   .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {

  // console.log(req, "reqlogin")
  // console.log(res.json, "reslogin")
  const username = req.body.username;
  console.log(username, "username")
  const password = req.body.hashedPassword;
  console.log(password, "password")
  //pulls user data by username from usersDB
  const user = User.findOne({
    username
  })
  console.log(user, "help")
  // console.log(user , "user")
  // console.log({username})
  user.then(function (user) {
      //bcrypt then compares the hashed passwords
      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(function (samePassword) {
      //if wrong send 403
      if (!samePassword) {
        res.sendStatus(403)
      }
      //if right send 200
      console.log("Dumbass")
      console.log(user._id, "ME HINOY")
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        user: '_id'
      }, "askdjfhsejhkgfjshk");
      console.log(token, "token")
      
      res.json({
        token,
        user: {
          id: user._id ,
          username: user.username

        }
      });

    })
    .catch(function (error) {
      console.log("Error authenticating user: ");
      console.log(error);
    });
});

  router.post("/tokenIsValid" , async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);

      const verified = jwt.verify(token, "askdjfhsejhkgfjshk");
      if (!verified) return res.json(false);

      const user = User.findById(verified.id);
      if (!user) return res.json(false);


    } catch (err) {
      res.sendStatus(500).json({err: err.message});

    }


  })


module.exports = router;