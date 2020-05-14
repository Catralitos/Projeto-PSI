var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReservaSchema = new Schema(
    {
        quarto: { type: Schema.Types.ObjectId, ref: 'Quarto', required: true },
        checkin: { type: Date, required: true},
        checkout: { type: Date, required: true},
        nome: { type: String, required: true},
        morada: {type: String},
        numero_telefone: {type: String, max: 15},
        email: {type: String, required: true},
        nif: {type: Number, maxlength: 9, minlength: 9},
        numeroCartao: {type: Number, minlength: 9, maxlength: 9},
        ccv: {type: Number, minlength: 3, maxlength: 3},
        anoValidade: {type:Number, minlength: 4, maxlength: 4},
        mesValidade: {type:Number, maxlength: 2}
    }
)

ReservaSchema
.virtual('url')
.get(function () {
    return 'catalog/reserva/' + this._id;
});

module.exports = mongoose.model('Reserva', ReservaSchema);