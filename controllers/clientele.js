
const path = require('path');
const Clientele = require('../models/clientele');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


//@desc Get the clientele
//@route Get /api/v1/clientele
//@access Public
exports.getClienteles = asyncHandler( async (req, res, next)=>{
    console.log("The thing enter here...")
    const clientele = await Clientele.find();
    if(!clientele){
        return next(new ErrorResponse("Clientele not found", 404));
    }
    console.log(clientele);
    res.status(200).json({success: true, data: clientele});
});

exports.getClientele = asyncHandler( async(req, res, next)=>{
    const clientele = await Clientele.findById(req.params.id);

    if(!clientele) {
        return next(
            new ErrorResponse(`Clientele with ID of ${req.params.id} not found`, 404)
        );
    }
    res.status(200).json({success: true, data:clientele});
});

exports.postClientele = asyncHandler( async (req, res, next)=>{
    const clientele = await Clientele.create(req.body);
    res.status(201).json({success: true, data: clientele});
    console.log(clientele); //TODO: Delete
});

exports.deleteClientele= asyncHandler(async (req, res, next)=> {

    const clientele = await Clientele.deleteOne(req.params.id);

    if(!clientele) {

        return next(
            new ErrorResponse(`Measurement with ID of ${req.params.id} not found`, 404)
        );
    }
    console.log(clientele); //TODO: Delete

    res.status(200).json({success: true, data:`clientele ID ${req.params.id} deleted`});
});
    
exports.deleteClienteles= asyncHandler( async (req, res, next)=> {

    const clientele = await Clientele.deleteMany();

    if(!clientele) {

        return next(
            new ErrorResponse(`Clientele not found`, 404)
        );
    }
    res.status(200).json({success: true, data:clientele});
});