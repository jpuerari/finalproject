import axios from 'axios';

  export const  getSavedCountries = function () {
    return axios.get('/api/countries');
  };

  export const savedCountries = function (countryData) {
    return axios.post('/api/contries', countryData);
  };
  export const deleteCountry = function (countryId) {
    return axios.delete(`/api/countries/${countryId}`);
  };
  export const searchCountries = function (country) {
    return axios({
      "method": "GET",
      "url": "https://restcountries-v1.p.rapidapi.com/name/" + country,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "df7e857c6cmsha59b298d56b071ap16165fjsndbf8b1441fa8"
      }
    });
  };


