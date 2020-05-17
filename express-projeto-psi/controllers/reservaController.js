var Reserva = require('../models/reserva')
var async = require('async')
var Quarto = require('../models/quarto')
//var check  = require('express-validator/check');
//var validationResult = require('express-validator/check');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.getReserva = function (req, res, next) {
    Reserva.find({ 'quarto': req.params.quarto })
        .exec(function (err, reserva) {
            if (err) { return next(err); }
            res.json({ reserva: reserva });
        })
}

exports.getReservas = function (req, res, next) {
    Reserva.find()
        //.sort([['nif', 'ascending']])
        .exec(function (err, list_reservas) {
            if (err) { return next(err); }
            res.json({ reservas_list: list_reservas });
        })
}

exports.reserva_create_post = [

    validationResult('quarto').escape(),
    validationResult('nome').isLength({ min: 3}).trim().escape(),
    validationResult('email').isEmail().normalizeEmail(),
    validationResult('checkin').toDate().escape(),
    validationResult('checkout').toDate().escape(),
    validationResult('morada').isLength({ min: 3}).trim().escape(),
    validationResult('numero_telefone').isLength({ min: 13, max: 14}).trim().escape(),
    validationResult('nif').isNumeric().trim().escape(),
    validationResult('numeroCartao').isNumeric().trim().escape(),
    validationResult('mesValidade').isNumeric().trim().escape(),
    validationResult('anoValidade').isNumeric().trim().escape(),
    validationResult('ccv').isNumeric().trim().escape(),

    /*  // Validate fields.
    body('nome').isLength({ min: 1 }).trim().withMessage('Cliente nome must be specified.'),
        //.isAlphanumeric().withMessage('Cliente nome has non-alphanumeric characters.'),
    body('email').isLength({ min: 1 }).trim().withMessage('Cliente email must be specified.'),
        //.isAlphanumeric().withMessage('Cliente email has non-alphanumeric characters.'),
    body('numero_telefone').isLength({ min: 1 }).trim().withMessage('Cliente numero_telefone must be specified.'),
    body('morada').isLength({ min: 1 }).trim().withMessage('Cliente morada must be specified.'),
        //.isAlphanumeric().withMessage('Cliente morada has non-alphanumeric characters.'),
    body('checkin', 'Invalid checkin').optional({ checkFalsy: true }).isISO8601(),
    body('checkout', 'Invalid checkout').optional({ checkFalsy: true }).isISO8601(),
    body('nif').isLength({ min: 1 }).withMessage('Cliente nif must be specified.'),
    body('anoValidade').isLength({ min: 1 }).withMessage('Cliente anoValidade must be specified.'),
    body('mesValidade').isLength({ min: 1 }).withMessage('Cliente mesValidade must be specified.'),
    body('numeroCartao').isLength({ min: 1 }).withMessage('Cliente numeroCartao must be specified.'),
    body('ccv').isLength({ min: 1 }).withMessage('Cliente ccv must be specified.'),

    // Sanitize fields.
    sanitizeBody('quarto').escape(),
    sanitizeBody('checkin').toDate(),
    sanitizeBody('checkout').toDate(),
    sanitizeBody('nome').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('morada').escape(),
    sanitizeBody('numero_telefone').escape(),
    sanitizeBody('nif').escape(),
    sanitizeBody('numeroCartao').escape(),
    sanitizeBody('ccv').escape(),
    sanitizeBody('anoValidade').escape(),
    sanitizeBody('mesValidade').escape(), */
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Reserva object with escaped and trimmed data
        var reserva = new Reserva(
            {
                quarto: req.body.quarto,
                checkin: req.body.checkin,
                checkout: req.body.checkout,
                nome: req.body.nome,
                morada: req.body.morada,
                numero_telefone: req.body.numero_telefone,
                email: req.body.email,
                nif: req.body.nif,
                numeroCartao: req.body.numeroCartao,
                ccv: req.body.ccv,
                anoValidade: req.body.anoValidade,
                mesValidade: req.body.mesValidade,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            //console.log("Reserva: %j", reserva);
            console.log("Erros: %j", errors.array());
            res.json({ reserva: reserva, errors: errors.array() });
            return;
        }
        else {
            // Save Reserva.
            reserva.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new Reserva record.
                res.redirect(reserva.url);
            });
        }
    }
];
