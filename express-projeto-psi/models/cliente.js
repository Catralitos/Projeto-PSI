var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClienteSchema = new Schema(
    {
        nome: { type: String, required: true},
        password: {type: String, required: true},
        morada: {type: String},
        numero_telefone: {type: String, minlength: 14, maxlength: 15},
        email: {type: String, required: true, unique: true},
        nif: {type: Number, maxlength: 9, minlength: 9},
    }
)

ClienteSchema
.virtual('url')
.get(function () { 
  return '/catalog/cliente/' + this._id;
});

module.exports = mongoose.model('Cliente', ClienteSchema);