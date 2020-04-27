var Hotel = require('../models/hotel')
var async = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.get_hotels = function(req, res, next) {
  Hotel.find()
      .sort([['name', 'ascending']])
      .exec(function (err, list_hotels) {
          if (err) { return next(err); }
          // Successful, so render.
          res.json({hotel_list: list_hotels });
      })
}

exports.get_hotel = function(req, res, next) {
  Hotel.findById(req.params.id)
    .exec(function (err, hotel) {
      if (err) { return next(err); }
      res.json({hotel : hotel})
    }
}
