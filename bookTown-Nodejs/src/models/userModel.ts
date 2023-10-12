const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    fullname : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    phone: {
        type : Number,
    },
    streetAddress: { 
        type: String
    },
    pincode : {
        type : Number
    },
    state : {
        type: String
    },
    country : {
        type: String
    }
}, { collection: 'Users'});

module.exports = mongoose.model('Users', userScheme);