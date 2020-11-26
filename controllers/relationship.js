const path = require('path');
const Relationship = require('../models/relationship');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


//@desc Get the relationship
//@route Get /api/v1/relationship
//@access Public
exports.getRelationships = asyncHandler( async (req, res, next)=>{
    const relationship = await Relationship.find();
    if(!relationship){
        return next(new ErrorResponse("Relationship not found", 404));
    }
    console.log(relationship);
    res.status(200).json({success: true, data: relationship});
});

exports.getRelationship = asyncHandler( async(req, res, next)=>{
    const relationship = await Relationship.findById(req.params.id);

    if(!relationship) {
        return next(
            new ErrorResponse(`Relationship with ID of ${req.params.id} not found`, 404)
        );
    }
    res.status(200).json({success: true, data:relationship});
});

exports.postRelationship = asyncHandler( async (req, res, next)=>{
    const relationship = await Relationship.create(req.body);
    res.status(201).json({success: true, data: relationship});
    console.log(relationship); //TODO: Delete
});

exports.deleteRelationship= asyncHandler(async (req, res, next)=> {

    const relationship = await Relationship.deleteOne(req.params.id);

    if(!relationship) {

        return next(
            new ErrorResponse(`Relationship with ID of ${req.params.id} not found`, 404)
        );
    }
    console.log(relationship); //TODO: Delete

    res.status(200).json({success: true, data:`relationship ID ${req.params.id} deleted`});
});
    
exports.deleteRelationships= asyncHandler( async (req, res, next)=> {

    const relationship = await Relationship.deleteMany();

    if(!relationship) {

        return next(
            new ErrorResponse(`No relationship found`, 404)
        );
    }
    res.status(200).json({success: true, data:relationship});
});