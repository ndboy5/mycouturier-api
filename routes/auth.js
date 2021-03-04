const express = require('express');
const { protect}  = require('../middleware/auth');
const { register, fb_register, login, fb_login, getMe,   forgotPassword,  resetPassword,  
        updateDetails, updatePassword, }  = require('../controllers/auth');

router = express.Router();

router.post('/register', register);
router.post('/register/facebook', fb_register);

router.post('/login', login);
router.post('/login/facebook', fb_login);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;