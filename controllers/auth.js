const crypto = require('crypto');
const Accounts = require("../models/accounts");
const asyncHandler = require("../middleware/async");
const errorResponse = require("../utils/errorResponse");
const  sendEmail  = require('../utils/sendmail');


//@desc Register new account (for accounts not registering through FB, Twitter etc)
//@route POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
const { code, surname, firstname, email, phone, password, role } = req.body;

const account = await Accounts.create({
    code, surname, firstname, email, phone, password, role
});

//To generate token for now account and send as response
sendTokenResponse(account, 200, res);
});



//@desc   Login (for accounts already registered. It allows login via email or CODE or phone number)
//@route  POST /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {

const { phone, password } = req.body;
//TODO: build functionality to enable login using email or phone number also

//Validate code and password to ensure it isn't null 
if(!phone || !password){
  return next(new errorResponse('Please provide an email|phone and password', 400));
}

//Check for if account exists in DB
const account = await Accounts.findOne({phone}).select('+password');
if(!account){
  return next(new errorResponse('Invalid credentials. ', 401));
}

//Check if the password matches hashed password in DB
 const isMatchedPwd = await account.matchPassword(password);
 if(!isMatchedPwd){
   return next(new errorResponse('Invalid credentials. Forgot password?', 401));
 }

//To generate token for now account and send as response
sendTokenResponse(account, 200, res);
console.log(`user ${account.surname} logged in successfully`) //TODO: Remove this for production env
});

// @desc      Update account details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const account = await Account.findByIdAndUpdate(req.account.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: account
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const account = await Accounts.findById(req.account.id).select('+password');

  // Check current password
  if (!(await account.matchPassword(req.body.currentPassword))) {
    return next(new errorResponse('Password is incorrect', 401));
  }

  account.password = req.body.newPassword;
  await account.save();

  sendTokenResponse(account, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  //TODO: modify this code to allow for use of either email or phone to perform password reset
  const account = await Accounts.findOne({ phone: req.body.phone });

  if (!account) {
    return next(new errorResponse(`Sorry, there is no account with phone no ${req.body.phone}`, 404));
  }

  // Get reset token
  const resetToken = account.getResetPasswordToken();

  await account.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: account.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    account.resetPasswordToken = undefined;
    account.resetPasswordExpire = undefined;

    await account.save({ validateBeforeSave: false });

    return next(new errorResponse('Email could not be sent', 500));
  }

  res.status(200).json({
    success: true,
    data: account
  });
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const account = await Accounts.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!account) {
    return next(new errorResponse('Invalid token', 400));
  }

  // Set new password
  account.password = req.body.password;
  account.resetPasswordToken = undefined;
  account.resetPasswordExpire = undefined;
  await account.save();

  sendTokenResponse(account, 200, res);
});


// This function gets token from model, creates a cookie and sends response to client
const sendTokenResponse = (account, statusCode, res) => {
  // Create token
  const token = account.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // 30days converted to seconds
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options)
     .json({
      success: true,
      token
    });
};

// @desc      To find out the current account account during authorization
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
console.log("It got here: "); //TODO: Remove this
  const account = await Accounts.findById(req.account.id);


  res.status(200).json({
    success: true,
    data: account
  });
});