/* This auth middlewear is used to protect sensitive routes on the server and to ensure only authorised access to resources
It verifies tokens and returns an account _id which will be used to manage the logged in user
*/
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Account = require('../models/accounts');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in the authorization header of the web/mobile client.
    token = req.headers.authorization.split(' ')[1];

    // TODO: Alternatively set the token from token from cookie with the below code
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }


  // Test to ensure that the token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //make the account details available to any other controller function which is protected by the protect route
    req.account = await Account.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});


// Grants access to specific account roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.account.role)) {
      return next(
        new ErrorResponse(
          `Account role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};