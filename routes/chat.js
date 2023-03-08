// const { Router } = require('express');
const express = require('express');
const { protect }  = require('../middleware/auth');

//use destructuring to import controller functions
const { getMeasurements, getMeasurement, postMeasurements, deleteMeasurements, 
        deleteMeasurement
    } = require('../controllers/measurements');

//Bring in the Router
const router = express.Router();

//TODO: Complete the destinations

//re-route the URLs/URI to thier various destination functions in the controller
router.route('/')
.get(getMeasurements)
.post(protect, postMeasurements)
.delete(protect, deleteMeasurements);

router.route('/:id')
.get(getMeasurement)
.delete(protect, deleteMeasurement);
module.exports = router;