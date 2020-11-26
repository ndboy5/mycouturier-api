const path = require("path");
const Accounts = require("../models/accounts");
const asyncHandler = require("../middleware/async");
const errorResponse = require("../utils/errorResponse");

exports.getAccounts = asyncHandler(async (req, res, next) => {
  const accounts = await Accounts.find();

  if (!accounts) {
    return next(new errorResponse("Accounts not found", 404));
  }

  res.status(200).json({ success: true, data: accounts });
});

exports.getAccount = asyncHandler(async (req, res, next) => {
  const account = await Accounts.findById(req.params.id);

  if (!account) {
    return next(new errorResponse(`Account with ID ${req.params.id} was not found`, 404));
  }

  res.status(200).json({ success: true, data: account });
});


exports.deleteAccounts = asyncHandler(async (req, res, next) => {
  const accounts = await Accounts.deleteMany();

  if (!accounts) {
    return next(new errorResponse(`No account deleted`, 404));
  }

  res.status(200).json({ success: true, data: accounts });
});

//TODO: Modify this code to use the find and then remove methods rather than the deleteOne method currently used
// the deleteOne method expects an object as parameter
exports.deleteAccount = asyncHandler(async (req, res, next) => {
    const account = await Accounts.deleteOne(req.params.id);
  
    if (!account) {
      return next(new errorResponse(`Account with ID ${req.params.id} was not deleted`, 404));
    }
    res.status(200).json({ success: true, data: account });
  });


exports.postAccount = asyncHandler(async (req, res, next) => {
  const account = await Accounts.create(req.body);

  if (!account) {
    return next(new errorResponse("Unable to create account", 404)); //verify correctness of server code used here
  }
  res.status(200).json({ success: true, data: account });
});


exports.updateAccount = asyncHandler(async (req, res, next) => {
  //TODO: reconsider reviewing this method to only use the find and Update once.
  let account = await Accounts.findById(req.params.id);

  if (!course) {
    return next(
      new errorResponse(`No account with ID of ${req.params.id} found`, 404)
    );
  }
  let course = await Accounts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: course });
});
