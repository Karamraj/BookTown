const mongoose = require('mongoose');

const cartModel = new mongoose.Schema(
  {
   categoryName : {
    type : String,
    required: true,
   }
   
  }, { collection: 'Carts'});

module.exports = mongoose.model('Carts', cartModel);