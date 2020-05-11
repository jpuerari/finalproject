// import places model
const  Place  = require('../models/Place');
const  User  = require('../models/User');



module.exports = {
  async getAllPlaces(req, res) {
    const places = await Place.find();
    return res.json(places);
  },
  async savePlace({ user, body }, res) {
    // console.log("Place", Place)
    // console.log(req.body);
    // try {
    //   const savedPlace = await Place.create(req.body);
    //   return res.json(savedPlace);
    // } catch (err) {
    //   console.log(err);
    //   return res.status(400).json(err);
    // }
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedPlaces: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async deletePlace(req, res) {

    const deletedPlace = await Place.findOneAndRemove({ _id: req.params.id });
    if (!deletedPlace) {
      return res.status(404).json({ message: "Couldn't find a Place with this id!" });
    }
    return res.json(deletedPlace);
  },
};