const {Schema, model} = require('mongoose');

const citySchema = new Schema({
    cityName:{
        type: String,
    },
    countryName:
    {
       type: String,      
    },
    population:
    {
        type: String,
    },
    temperature:
    {
        type: String,
    }

})

module.exports = citySchema