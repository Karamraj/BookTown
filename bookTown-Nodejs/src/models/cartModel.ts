const mongoose = require('mongoose');

const cartModel = new mongoose.Schema(
  {
   userId : {
    type : String,
    required: true,
   },
   items: [
    {
    bookId: String,
    quantity:Number
}],
  }, { collection: 'Carts'});

module.exports = mongoose.model('Carts', cartModel);