const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const placeSchema = require('./Place');
const SALT_WORK_FACTOR = 5;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  savedPlaces: [placeSchema],
=======
=======

  savedPlaces: [placeSchema],

>>>>>>> e615a9421f7f6815e15d0201cf80e771da528ba0
=======

  savedPlaces: [placeSchema],

  savedPlaces: [placeSchema],


>>>>>>> 0ba8aac019ba57593731f4ec8c0fab26f85ef8cf
  savedCountries: {
    type: [String],
    default: []
  },
  countryCount: Number
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 319ba669747515436c8aa6de59477b6dd50b9f39
=======

>>>>>>> e615a9421f7f6815e15d0201cf80e771da528ba0
=======

>>>>>>> 0ba8aac019ba57593731f4ec8c0fab26f85ef8cf
});

UserSchema.pre("save", function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  next();

});

// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;