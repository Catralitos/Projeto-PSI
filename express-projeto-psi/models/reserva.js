var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReservaSchema = new Schema(
    {
        quarto: { type: Schema.Types.ObjectId, ref: 'Quarto', required: true },
        checkin: { type: Date, required: true},
        checkout: { type: Date, required: true},
        cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true}
    }
)

ReservaSchema
.virtual('url')
.get(function () {
    return 'catalog/reserva/' + this._id;
});

module.exports = mongoose.model('Reserva', ReservaSchema);