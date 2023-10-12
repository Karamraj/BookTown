const mongoose = require('mongoose');

const userPasswordModel = new mongoose.Schema(
  {
   userId : {
    type : String,
    required: true,
   },
   salt : {
    type : String,
    required: true,
   },
   passwordHash : {
    type : String,
    required: true,
   }
   
  }, { collection: 'UserPassword'});

module.exports = mongoose.model('UserPassword', userPasswordModel);