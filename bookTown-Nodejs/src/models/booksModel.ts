const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const booksScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true
  },
  coverImage : {
    type : String,
    required: true,
  },
  price : {
    type : Number,
    required : true
  },
  rating : {
    type : Number
  },
  categories : {
    type : Array<string>
  } 
}, { collection: 'Books'});

booksScheme.plugin(mongoosePaginate);
module.exports = mongoose.model('Books', booksScheme);