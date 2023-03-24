const express = require("express");
const { protect } = require("../middleware/auth");

//use destructuring to import controller functions
const {
getChatById, postChatRoom, postMessageInChatRoom, deleteMessage
//Todo: create the delete chatroom functionality
} = require("../controllers/chatroom");

//Bring in the Router
const router = express.Router();

//TODO: Complete the destinations

//re-route the URLs/URI to thier various destination functions in the controller
router.route("/").post(postChatRoom);
router.route("/message").post(postMessageInChatRoom);

router.route("/:id").get(getChatById).delete(protect, deleteMessage);
module.exports = router;
