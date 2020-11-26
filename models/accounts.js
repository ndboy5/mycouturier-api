const mongoose = require('mongoose');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const accountsSchema = mongoose.Schema({
    //TODO: Consider use of Graph DBs like Neo4J for Tailor - Customer relationship
    surname: {
        type: String,
    }, 
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     , 'kindly enter a valid email address'],
        required: [true, "Please enter an email address"], //TODO: Decide on which to be made compulsory between email and phone no
        unique: [true, "This email is already registered"]
    },
    phone:{
      //TODO: develop a regex match for phone numbers or prefferably do so on the client side
      type: Number,
      required: [true, 'Please enter a phone no'],
      unique: [true, "This phone number is already registered"]
    },
    password:{
        type: String,
        required: [true, "please enter password"],
        select: false, //This hide the pwd where account object is selected
        minLength: 5
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
        type: String,
        required: true,
        enum: ['admin','tailor', 'customer'], //TODO: Admin user is to be configured on the Database level 
        default: "customer"
    },
    selfRecords:[{
      type: mongoose.Schema.ObjectId,
      ref:'Measurements'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

/*
Methods called before accesing the DB
*/
//Password encryption. Bcryptjs package used here for encryption
accountsSchema.pre('save', async function (next){
  //To skip password encryption when using te password reset functionality(updating restepwd token)
if(!this.isModified('password')){
  next();
}

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});


/*
Methods called after accessing collection in the DB
*/
// Sign Token using the Jason Web Token package and return value
accountsSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database 
accountsSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
accountsSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expiry date of password reset in seconds (default to 10secs)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//match the login password entered by user with the encrypted password in DB
accountsSchema.methods.matchPassword = async function(enteredPassword){
  return await bcryptjs.compare(enteredPassword, this.password);
}
module.exports = mongoose.model("Accounts", accountsSchema);