const { Schema, model } = require('mongoose');


const placeSchema = new Schema({
  // countryId:{
  //   type: String,
  // },
  nativeName: {
    type: String,
  },
  capital: {
    type: String,
    
  },
  currencies: {
    type: [String]
  
  },
  languages: {
    type: [String],
   
  },

})

//const Place = model("Place", placeSchema);

//module.exports = Place;

module.exports = placeSchema;