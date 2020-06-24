const router = require('express').Router();
let User = require('./models/users.model');

router.route('/').get((req, res) => {
  User.find()                             ///in mongoose find method this is like select * in sql
    .then(user => res.json(user))       //get all users, and return all users in db
    .catch(err => res.status(400).json('Error: ' + err));  ///if there is an error
});

router.route('/add').post((req, res) => {               ///app incoming post request.usersname is part of request body
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()             ////save method.
    .then(() => res.json('User added!'))  //after user is saved, send msg 'user'added'
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;