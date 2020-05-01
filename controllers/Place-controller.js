// import book model
const { Place } = require('../models');

module.exports = {
  async getAllPlaces(req, res) {
    const books = await Place.find();
    return res.json(places);
  },
  async savePlace(req, res) {
    console.log(req.body);
    try {
      const savedPlace = await Place.create(req.body);
      return res.json(savedPlace);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async deletePlace(req, res) {
    const deletedBook = await Place.findOneAndRemove({ _id: req.params.id });
    if (!deletedBook) {
      return res.status(404).json({ message: "Couldn't find Place with this id!" });
    }
    return res.json(deletedPlace);
  },
};