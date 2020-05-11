const router = require('express').Router();
const { getAllPlaces, savePlace, deletePlace } = require('../controllers/Place-controller');
const { getAllCities, saveCity, deleteCity } = require('../controllers/City-controller');
const { authMiddleware } = require('../utils/auth');

// for GET and POST /api/places
router.route('/').get(getAllPlaces).post(authMiddleware, savePlace);

// for DELETE /api/places/:id
router.route('/:id').delete(deletePlace);

// for GET and POST /api/places/city
router.route('/city').get(getAllCities).post(saveCity);

// for DELETE /api/places/city/:id
router.route('/city/:id').delete(deleteCity);

module.exports = router;