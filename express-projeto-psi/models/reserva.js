var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReservaSchema = new Schema(
    {
        quarto: { type: Schema.Types.ObjectId, ref: 'Quarto', required: true },
        checkin: { type: Date, required: true},
        checkout: { type: Date, required: true},
        nome: { type: String, required: true},
        morada: {type: String, required: true},
        numero_telefone: {type: String, max: 15, required: true},
        email: {type: String, required: true},
        nif: {type: Number, maxlength: 9, minlength: 9, required: true},
        numeroCartao: {type: Number, minlength: 16, maxlength: 16, required: true},
        ccv: {type: Number, minlength: 3, maxlength: 3, required: true},
        anoValidade: {type:Number, minlength: 4, maxlength: 4, required: true},
        mesValidade: {type:Number, maxlength: 2, required: true}
    }
)

ReservaSchema
.virtual('url')
.get(function () {
    return 'catalog/reserva/' + this._id;
});

module.exports = mongoose.model('Reserva', ReservaSchema);