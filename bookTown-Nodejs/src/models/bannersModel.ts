const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const bannerScheme = new mongoose.Schema(
  {
   bannerImage : {
    type : String,
    required: true,
   },
   bannerHeading : {
    type : String,
    required: true,
   },
   bannerDescription : {
    type : String,
    required: true,
   }
   
  }, { collection: 'Banners'});

bannerScheme.plugin(mongoosePaginate);
module.exports = mongoose.model('Banners', bannerScheme);