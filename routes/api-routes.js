const router = require('express').Router();
const { getAllPlaces, savePlace, deletePlace } = require('../controllers/Place-controller');

// for GET and POST /api/books
router.route('/places').get(getAllPlaces).post(savePlace);

// for DELETE /api/books/:id
router.route('/:id').delete(deletePlace);

module.exports = router;