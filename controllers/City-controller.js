const {City} = require('../models/city')


module.exports = {
    async getAllCities(req, res) {
      const cities = await Place.find();
      return res.json(cities);
    },
    async savedCity(req, res) {
      console.log(req.body);
      try {
        const savedCity = await City.create(req.body);
        return res.json(savedCity);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    async deleteCity(req, res) {
      const deletedCity = await City.findOneAndRemove({ _id: req.params.id });
      if (!deletedCity) {
        return res.status(404).json({ message: "Couldn't find a City with this id!" });
      }
      return res.json(deletedCity);
    },
  };