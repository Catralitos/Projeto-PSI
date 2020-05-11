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

exports.reserva_create_get = function (req, res, next) {
    res.json();
};

exports.reserva_create_post = [

  // Validate fields.
  body('quarto').isLength({ min: 1 }).trim().withMessage('Reserva quarto must be specified.'),
  body('checkin').isLength({ min: 1 }).trim().withMessage('Reserva checkin must be specified.'),
  body('checkout').isLength({ min: 1 }).trim().withMessage('Reserva checkout must be specified.'),
  body('cliente').isLength({ min: 1 }).trim().withMessage('Reserva cliente must be specified.'),

  // Sanitize fields.
  sanitizeBody('quarto').escape(),
  sanitizeBody('checkin').toDate(),
  sanitizeBody('checkout').toDate(),
  sanitizeBody('cliente').escape(),

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
              cliente: req.body.cliente,
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
