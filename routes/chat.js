// const { Router } = require('express');
const express = require('express');
const { protect }  = require('../middleware/auth');

//use destructuring to import controller functions
const {  } = require('../controllers/chats');

//Bring in the Router
const router = express.Router();

//TODO: Complete the destinations

//re-route the URLs/URI to thier various destination functions in the controller

router.route('/:id')
.get(getChats)
module.exports = router;