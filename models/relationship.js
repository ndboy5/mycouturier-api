const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.ObjectId,
        ref: 'accounts',
        require: false
    },
    to:{
        type: mongoose.Schema.ObjectId,
        ref: 'accounts',
        required: false
    },
    isClientAccepted: Boolean,
    clientAcceptDate: {
        type:Date,
        default: Date.now
    },
    isProviderAccepted: Boolean,
    providerAcceptDate: {
        type:Date,
        default: Date.now
    },

    relType: {
        type: String,
        required: true, 
        enum: ['C', 'F'] 
        //Meaning C=> Client-Provider Relationship, F=Friendship relationship(Circle)
    },
    stars:Number, //Number of stars given by the client to a provider. May not be useful for client's friendship relationships
    isOpened: Boolean, //TODO: Decide on weather friends can have access to a client's  provider(e.g Tailor)

    createdAt: {
        type: Date,
        default: Date.now
    },

})
module.exports = mongoose.model("Relationship", relationshipSchema);