import axios from 'axios';

export const getSavedCountries = function () {
  return axios.get('/api/countries');
};

export const saveCountries = function (countryData) {
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
export const openWeather = search => axios({
  "method": "GET",
  "url": "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
  "headers": {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key": "df7e857c6cmsha59b298d56b071ap16165fjsndbf8b1441fa8"
  },
  "params": {
    "q": search,
    "units": "imperial"
  }
})

export const login = function(userData){
  return axios.post("/api/auth/signin", userData)
}
export const test = function(){
  return axios.post("/api/auth/test")
}

export const cityName = search => axios({
  "method": "GET",
  "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  "headers": {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    "x-rapidapi-key": "df7e857c6cmsha59b298d56b071ap16165fjsndbf8b1441fa8"
  },
  "params": {
    "namePrefix": search,
  }})

  export const getMe = function (token) {
    return axios.get('/api/auth/me', { headers: { authorization: `Bearer ${token}` } });
  };



// CREATE THIS IN API.JS
export function getPhoto(searchTerm) {
  return axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {params: {
    key: 'AIzaSyCjVZg684VufdZZzAGT3XAjvB8rL2OWODU',
    inputtype: 'textquery',
    input: searchTerm 
  }}).then(({data}) => {
    console.log(data);
    const placeId = data.candidates[0].place_id;
    return axios.get('https://maps.googleapis.com/maps/api/place/details/json', {params: {
      key: 'AIzaSyCjVZg684VufdZZzAGT3XAjvB8rL2OWODU',
      place_id: placeId
    }})
  })
}
