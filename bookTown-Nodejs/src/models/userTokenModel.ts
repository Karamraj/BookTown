const mongoose = require('mongoose');

const UserTokenModel = new mongoose.Schema(
  {
   userId : {
    type : String,
    required: true,
   },
   token : {
    type : String,
    required: true,
   },
   
  }, { collection: 'UserToken'});

module.exports = mongoose.model('UserToken', UserTokenModel);