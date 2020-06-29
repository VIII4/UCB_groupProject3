const router = require("express").Router();
const userController = require("../controllers/userController");

// Process  with "/user" in userController file
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

//process with  "/user/:id"  in userController file
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;