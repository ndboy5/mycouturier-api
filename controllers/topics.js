const path = require("path");
const Topics = require("../models/topics");
const Posts = require("../models/posts");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc Returns the list of topics to the client.
//@route Get /api/v1/topics
//@access Public
exports.getTopics = asyncHandler(async (req, res, next) => {
  const topics = await Topics.find();
  if (!topics) {
    return next(new ErrorResponse("topics not found", 404));
  }
  console.log(topics);
  res.status(200).json({ success: true, data: topics });
});

/*
@desc Returns the details of a single topic (also includes the posts made under that topic)
*/
exports.getTopic = asyncHandler(async (req, res, next) => {
  const topic = await Topics.findById(req.params.id);
  // const posts = await Posts
  //TODO: find the posts under the topics before sending to the client
  if (!topic) {
    return next(
      new ErrorResponse(`Topic with ID of ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: topic });
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
