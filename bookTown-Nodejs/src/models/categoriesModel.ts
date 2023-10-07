const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const categoryScheme = new mongoose.Schema(
  {
   categoryName : {
    type : String,
    required: true,
   }
   
  }, { collection: 'Categories'});

categoryScheme.plugin(mongoosePaginate);
module.exports = mongoose.model('Categories', categoryScheme);