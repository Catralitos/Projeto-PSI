var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HotelSchema = new Schema(
  {
    name: {type: String, required: true, max: 20},
    description: {type: String, required: true},
    address: {type: String, required: true, max: 100},
    coordinates: {type: String, required: true, max: 100},
    phone_number: {type: String, required: true, max: 15},
    mail: {type: String, required: true, max: 20},
    image: [{type: String}],
    servico: [{type: Schema.Types.ObjectId, ref: 'Servico'}]
  }
);

// Virtual for hotel's URL
HotelSchema
.virtual('url')
.get(function () {
  return '/catalog/hotel/' + this._id;
});

//Export model
module.exports = mongoose.model('Hotel', HotelSchema);
