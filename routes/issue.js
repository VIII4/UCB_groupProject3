const router = require("express").Router();
const issueController = require("../controllers/issueController");

// Matches with "/issue"
router.route("/")
  .get(issueController.findAll)
  .post(issueController.create);

// Matches with "/api/issue/:id"
router
  .route("/:id")
  .get(issueController.findById)
  .put(issueController.update)
  .delete(issueController.remove);

///////////////////////////////////////////////////////////////////////////////

// TESTING
router.route("/updatevote/:id").post((req, res) => {
  Issue.findByIdAndUpdate(req.params.id, req.body)
    .then((dbModel) => {
      res.json(dbModel);
    })
    .catch((err) => res.status(422).json(err));
});

module.exports = router;
