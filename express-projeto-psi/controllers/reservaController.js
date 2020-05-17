var Reserva = require('../models/reserva')
var async = require('async')
var Quarto = require('../models/quarto')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.getReserva = function (req, res, next) {
    Reserva.find({'quarto' : req.params.quarto})
        .exec(function (err, reserva) {
            if (err) { return next(err); }
            res.json({ reserva: reserva });
        })
}

exports.getReservas = function (req, res, next) {
  Reserva.find()
      .sort([['quarto', 'ascending']])
      .exec(function (err, list_reservas) {
          if (err) { return next(err); }
          res.json({ reservas_list: list_reservas });
      })
}

exports.reserva_create_post = [

  // Validate fields.
  body('nome').isLength({ min: 1 }).trim().withMessage('Cliente nome must be specified.'),
  body('email').isLength({ min: 1 }).trim().withMessage('Cliente email must be specified.'),
  body('numero_telefone').isLength({ min: 1 }).trim().withMessage('Cliente numero_telefone must be specified.'),
  body('morada').isLength({ min: 1}).trim().withMessage('Cliente morada must be specified.'),

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
  sanitizeBody('mesValidade').escape(),
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
          res.json({reserva: reserva, errors: errors.array() });
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
