const router = require("express").Router();
const issueController = require("../controllers/issueController");

// Matches with "/issue"
router.route("/").get(issueController.findAll).post(issueController.create);

//Matches with "/issue/comments/"
router.route("/comments/:id").put(issueController.insertComment);

// Matches with "/api/issue/:id"
router
  .route("/:id")
  .get(issueController.findById)
  .put(issueController.update)
  .delete(issueController.remove);

module.exports = router;
