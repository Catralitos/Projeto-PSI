var express = require('express');
var router = express.Router();


var hotel_controller = require('../controllers/hotelController');
var quarto_controller = require('../controllers/quartoController');


/// HOTEL ROUTES ///
// GET catalog home page.
router.get('/', hotel_controller.index);

// GET request for creating a Hotek.
router.get('/hotel/create', hotel_controller.hotel_create_get);

// POST request for creating Hotel.
router.post('/hotel/create', hotel_controller.hotel_create_post);

// GET request for one Hotel.
router.get('/hotel/:id', hotel_controller.get_hotel);

// GET request for list of all Hotels.
router.get('/hotel', hotel_controller.get_hotels);


/// QUARTO ROUTES ///
router.get('/quarto/:id', quarto_controller.get_quarto);


module.exports = router;
