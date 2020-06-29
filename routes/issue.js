const router = require("express").Router();
let issue = require("../models/issue");
const Issue = require("../models/issue");

///////////////////////////////////////////////////////////////////////////////
router.route("/").get((req, res) => {
  issue
    .find() ///this is like select * in sql
    .then((issue) => res.json(issue)) ///get all of the issues in db and return them as json object
    .catch((err) => res.status(400).json("Error: " + err));
});
///////////////////////////////////////////////////////////////////////////////
router.route("/add").post((req, res) => {
  ///add method & post request
  const username = req.body.username;
  const descr = req.body.descr;
  const image1 = req.body.image1; ////converting duration to a number
  const image2 = req.body.image2;
  const image3 = req.body.image3;
  const zipcode = req.body.zipcode;
  const status = req.body.status;
  const date = Date.parse(req.body.date); ////converting date to a date for db
  const addtlcomments = req.body.addtlcomments;

  const newUser = new Issue({
    // write new issue to table and then save it
    username,
    descr,
    image1,
    image2,
    image3,
    zipcode,
    status,
    date,
    addtlcomments,
  });

  newIssue
    .save()
    .then(() => res.json("Issue added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

///////////////////////////////////////////////////////////////////////////////
router.route("/:id").get((req, res) => {
  Issue.findById(req.params.id)
    .then((Issue) => res.json(Issue))
    .catch((err) => res.status(400).json("Error: " + err));
});

///////////////////////////////////////////////////////////////////////////////
router.route("/:id").delete((req, res) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Issue deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

///////////////////////////////////////////////////////////////////////////////
router.route("/update/:id").post((req, res) => {
  Issue.findById(req.params.id)
    .then((issue) => {
      issue.username = req.body.username;
      issue.descr = req.body.descr;
      issue.image1 = req.body.image1; ////converting duration to a number
      issue.image2 = req.body.image2;
      issue.image3 = req.body.image3;
      issue.zipcode = req.body.zipcode;
      issue.date = Date.parse(req.body.date); ////converting date to a date for db
      issue.status = req.body.status;
      issue.addtlcomments = req.body.addtlcomments;

      issue
        .save()
        .then(() => res.json("Issue updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// TESTING
router.route("/updatecount/:id").post((req, res) => {
  Issue.findByIdAndUpdate(req.params.id, req.body)
    .then((dbModel) => {
      res.json(dbModel);
    })
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
