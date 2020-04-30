import axios from 'axios';

export default {
  getSavedCountries: function () {
    return axios.get('/api/countries');
  },
  getCountries: function (country) {
    return axios({
      "method": "GET",
      "url": "https://restcountries-v1.p.rapidapi.com/name/" + country,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "df7e857c6cmsha59b298d56b071ap16165fjsndbf8b1441fa8"
      }
    });
  },
  deleteCountry: function (Id) {
    return axios.delete(`/api/countries/${Id}`);
  },
}

