
const mongoose = require('mongoose');

const otpModel = new mongoose.Schema(
  {
   email : {
    type : String,
    required: true,
   },
   createdAt : {
    type : Date,
    required: true,
   },
   otp : {
    type : String,
    required: true,
   }
   
  }, { collection: 'OTP'});

module.exports = mongoose.model('OTP', otpModel);