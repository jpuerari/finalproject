const router = require('express').Router();
const { getAllPlaces, savePlace, deletePlace } = require('../controllers/Place-controller');
const { getAllCities, saveCity, deleteCity } = require('../controllers/City-controller');


// for GET and POST /api/places
router.route('/').get(getAllPlaces).post(savePlace);

// for DELETE /api/places/:id
router.route('/:id').delete(deletePlace);

// for GET and POST /api/city
router.route('/').get(getAllCities).post(saveCity);

// for DELETE /api/city/:id
router.route('/:id').delete(deleteCity);

module.exports = router;