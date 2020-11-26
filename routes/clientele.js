
// const { Router } = require('express');
const express = require('express');
const { protect }  = require('../middleware/auth');

//use destructuring to import controller functions
const { getClienteles, getClientele, postClientele, deleteClienteles, 
        deleteClientele
    } = require('../controllers/clientele');

//Bring in the Router
const router = express.Router();

//TODO: Complete the destinations

//re-route the URLs/URI to thier various destination functions in the controller
router.route('/')
.get(getClienteles)
.post(protect, postClientele)
.delete(protect, deleteClienteles);

router.route('/:id')
.get(getClientele)
.delete(protect, deleteClientele);

module.exports = router;