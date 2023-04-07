const express = require("express");
const { protect } = require("../middleware/auth");

//use destructuring to import controller functions
const {
  getTopic,
  getTopics,
  deleteTopic,
  postTopic,
  postCommentInTopic,
} = require("../controllers/topics");

//Bring in the Router
const router = express.Router();

//TODO: Complete the destinations

//re-route the URLs/URI to thier various destination functions in the controller
router.route("/").get(getTopics).post(postTopic);
router.route("/post").post(protect, postCommentInTopic);

router.route("/:id").get(getTopic).delete(protect, deleteTopic);
module.exports = router;
