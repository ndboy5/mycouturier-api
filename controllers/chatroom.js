const path = require("path");
const ChatRoom = require("../models/chatRoom");
const Messages = require("../models/messages");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

/*
@desc Returns the details of a single chat room along with its messages
The current design is to have one-on-one chats only between users
*/
exports.getTopic = asyncHandler(async (req, res, next) => {
  const chatRoom = await ChatRoom.findById(req.params.id);
  const messages = await Messages.find({ messages: chatRoom._id }).exec();

  //TODO: find the posts under the topics before sending to the client
  if (!chatRoom) {
    return next(
      new ErrorResponse(`Chat room with ID of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: { ...topic._doc, posts } });
});

exports.postTopic = asyncHandler(async (req, res, next) => {
  console.log("Here's what's on the request body: ", req.body);
  const topic = await Topics.create(req.body);
  res.status(201).json({ success: true, data: topic });
});

exports.postCommentInTopic = asyncHandler(async (req, res, next) => {
  const post = await Posts.create(req.body);
  res.status(201).json({ success: true, data: post });
});

/*
@desc Removes a single topic 
*/
exports.deleteTopic = asyncHandler(async (req, res, next) => {
  const topic = await Topics.deleteOne(req.params.id);

  if (!topic) {
    return next(
      new ErrorResponse(
        `Measurement with ID of ${req.params.id} not found`,
        404
      )
    );
  }
  console.log(topic); //TODO: Delete

  res
    .status(200)
    .json({ success: true, data: `topic ID ${req.params.id} deleted` });
});
