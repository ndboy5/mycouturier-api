const path = require("path");
const Measurements = require("../models/measurements");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");

//@desc Get the measurements
//@route Get /api/v1/measurements
//@access Public
exports.getMeasurements = asyncHandler(async (req, res, next) => {
  const measurements = await Measurements.find();
  if (!measurements) {
    return next(new ErrorResponse("Measurements not found", 404));
  }
  console.log("measurements retrieved");
  res.status(200).json({ success: true, data: measurements });
});

exports.getMeasurementsByAccount = asyncHandler(async (req, res, next) => {
  // console.log(req.params.ownerId);
  const ownerIdObj = mongoose.Types.ObjectId(req.params.ownerId);
  const measurements = await Measurements.find({
    ownerId: ownerIdObj,
    // ownerId: req.params.ownerId,
  }).exec();
  // console.log(measurements);
  if (!measurements) {
    return next(
      new ErrorResponse(
        `No measurement found for owner id ${req.params.ownerId} `,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: measurements });
});

exports.getMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurements.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(
        `Measurement with ID of ${req.params.id} not found`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: measurement });
});

exports.postMeasurements = asyncHandler(async (req, res, next) => {
  console.log("Here's what's on the request body: ", req.body);
  const measurement = await Measurements.create(req.body);
  res.status(201).json({ success: true, data: measurement });
  console.log(measurement); //TODO: Delete
});

exports.deleteMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurements.deleteOne(
    { _id: req.params.id },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Successfully deleted meausrement with id " + req.params.id
        );
      }
    }
  );

  if (!measurement) {
    return next(
      new ErrorResponse(
        `Measurement with ID of ${req.params.id} not found`,
        404
      )
    );
  }
  console.log(measurement); //TODO: Delete

  res
    .status(200)
    .json({ success: true, data: `measurement ID ${req.params.id} deleted` });
});

exports.deleteMeasurements = asyncHandler(async (req, res, next) => {
  const measurement = await Measurements.deleteMany();

  if (!measurement) {
    return next(new ErrorResponse(`Measurements not found`, 404));
  }
  res.status(200).json({ success: true, data: measurement });
});
