/*
Clientele model is used by Tailors only to manage thier customers.
Cliente-Provider relationship between Tailor and Customer is desirable but isn't mandatory here.
Customer ID is also NOT mandatory but may be established at any time.
*/
const mongoose = require('mongoose');

const clienteleSchema = mongoose.Schema(
    {
        ownedBy:{
            type: mongoose.Schema.ObjectId,
            ref:'Accounts',
            required: true,
        },
    measurement:{
        type: mongoose.Schema.ObjectId,
        ref: 'Measurements'
    },
    client:{
        type: mongoose.Schema.ObjectId,
        ref:'Accounts'
    },
    wearDescription: String,
    materialDesc:String, //E.g "Ankara"
    //For release 2
   // materialNo:"", 
   nextAppointmentDate: Date, //TODO: Reconsider for Release 1/2
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Clientele', clienteleSchema);