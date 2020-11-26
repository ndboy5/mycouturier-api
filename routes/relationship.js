const express = require('express');
const { protect }  = require('../middleware/auth');

//use destructuring to import controller functions
const { getRelationships, getRelationship, postRelationship, deleteRelationships, 
        deleteRelationship
    } = require('../controllers/relationship');

//Bring in the Router
const router = express.Router();

//TODO: Complete the destinations

//re-route the URLs/URI to thier various destination functions in the controller
router.route('/')
.get(getRelationships)
.post(protect, postRelationship)
.delete(protect, deleteRelationships);

router.route('/:id')
.get(getRelationship)
.delete(protect, deleteRelationship);

module.exports = router;