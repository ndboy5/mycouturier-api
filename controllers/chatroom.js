const path = require("path");
const ChatRoom = require("../models/chatRoom");
const Messages = require("../models/messages");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

/*
@desc Returns the details of a single chat room along with its messages
The current design is to have one-on-one chats only between users
*/
exports.getChatById = asyncHandler(async (req, res, next) => {
  const chatRoom = await ChatRoom.findById(req.params.id);
  const messages = await Messages.find({ messages: chatRoom._id }).exec();

  //TODO: find the posts under the topics before sending to the client
  if (!chatRoom) {
    return next(
      new ErrorResponse(`Chat room with ID of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: { ...chatRoom._doc, messages } });
});

//This function opens a new chatroom for discussion
//It is assumed that the accounts chatroom field has been checked if a
// discussion/chatroom exists before creating a new chatroom with same user
exports.postChatRoom = asyncHandler(async (req, res, next) => {
  const chatRoom = await ChatRoom.create(req.body);
  res.status(201).json({ success: true, data: chatRoom });
});

exports.postMessageInChatRoom = asyncHandler(async (req, res, next) => {
  const message = await Messages.create(req.body);
  res.status(201).json({ success: true, data: message });
});

/*
@desc Removes a single message in chat room 
*/
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Messages.deleteOne(req.params.id);

  if (!message) {
    return next(
      new ErrorResponse(
        `Chat message with ID of ${req.params.id} not found`,
        404
      )
    );
  }
  console.log(message); //TODO: Delete

  res
    .status(200)
    .json({ success: true, data: `topic ID ${req.params.id} deleted` });
});
