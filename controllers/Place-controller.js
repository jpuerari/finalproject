// import places model
const { Place } = require('../models');

module.exports = {
  async getAllPlaces(req, res) {
    const getPlaces = await Place.find();
    return res.json(places);
  },
  async savedPlace(req, res) {
    console.log(req.body);
    try {
      const savedPlaces = await Place.create(req.body);
      return res.json(savedPlace);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async deletePlace(req, res) {
    const deletedBook = await Place.findOneAndRemove({ _id: req.params.id });
    if (!deletedBook) {
      return res.status(404).json({ message: "Couldn't find a Place with this id!" });
    }
    return res.json(deletedPlace);
  },
};