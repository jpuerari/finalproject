const {Schema, model} = require('mongoose');

const citySchema = new Schema({
    cityId:{
        type: String,
    },

})

module.exports = citySchema