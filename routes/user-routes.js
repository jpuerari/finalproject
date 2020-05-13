const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveCity,
  deleteCity,
  savePlace,
  deletePlace,
  login,
} = require('./../controllers/user-controller');

// import middleware
const { authMiddleware } = require('./../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, savePlace);

router.route('/cities').put(authMiddleware, saveCity);

router.route('/cities/:id').delete(authMiddleware, deleteCity);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

 router.route('/:id').post(authMiddleware, savePlace).delete(authMiddleware, deletePlace);

module.exports = router;