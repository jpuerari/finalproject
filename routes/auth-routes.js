const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../utils/auth');

const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../controllers/user-controller');

router.post("/test", (req, res)=>{
  console.log("test worked inside the auth file");
  res.json(true)
})

// SIGN IN AND AUTHENTICATE A USER
// '/api/auth'
router.post("/signin", (req, res) => {
  // retrieve user from db by email
  console.log("it got here")
  User.findOne({
      username: req.body.username
    }).then(user => {
    // if no user found, let user know
    if (!user) {
      return res.status(404).json({
        message: 'no user found with that email!'
      });
    }

    // check if user's password matches req.body.password
    const passwordMatch = user.comparePassword(req.body.password);
    console.log(passwordMatch)
    // if passwordMatch is true, sign JWT and give user token
    if (passwordMatch) {
      //jwt.sign(userdata, secretkey)
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            username: user.username,
            _id: user.id
          }
        },
        'mysecretsshhhhh'
      );

      res.json({token, user});
    } else {
      res.status(400).json({
        message: 'You entered the wrong pw'
      });
    }

    // if not, let them know it's a wrong pw
  });
});

// localhost:3001/api/auth/addUser
router.post("/addUser", (req, res)=>{
  User.create(req.body)
  .then(data=>res.json(data))
  .catch(err=>console.log(err))
})

router.get("/me", authMiddleware, getSingleUser)

module.exports = router; 