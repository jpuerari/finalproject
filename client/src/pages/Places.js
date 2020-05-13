import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import SavedCountryContext from '../utils/SavedCountryContext';

import { saveCountries, searchCountries, getSavedCountries, openWeather, saveCity, getPhoto } from '../utils/API';

import SavedCityContext from '../utils/SavedCityContext';

function Places() {
  const [type, setType] = useState('city');
  // create state for holding returned  api data
  const [countries, setCountries] = useState([]);
  // create state to hold returned api data for cityName function

  // create state for storing and setting photo URL from google photos api
  const [locationPhoto, setLocationPhoto] = useState('');
  // create state to hold weather and set weather data
  const [weatherData, setWeatherData] = useState({});

  // create styate for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const { countries: savedCountries, getSavedCountries } = useContext(SavedCountryContext);

  const { cities: savedCities, getSavedCities } = useContext(SavedCityContext);

  const userData = useContext(UserInfoContext);

  // console.log(userData)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) return false;

    // RUN THIS FROM HANDLE FORM SUBMIT FUNCTION IN COMPONENT
    //   getPhoto(searchInput)
    //     .then(({ data }) => {
    //       console.log('hi from google photos')
    //       const photoReference = data.result.photos[0].photo_reference;
    //       // set photoReference to state
    //       console.log(data);
    //       const photoUrl = `http://maps.googleapis.com/maps/api/place/photo?key=AIzaSyCjVZg684VufdZZzAGT3XAjvB8rL2OWODU
    // &photoreference=${photoReference}&maxwidth=1000`
    //       console.log(photoReference);
    //       setLocationPhoto(photoUrl)
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })

    // GET weatherdata through openWeather
    if (type === 'city')
      openWeather(searchInput)
        .then((response) => {
          console.log(response.data);
          setCountries([]);
          setWeatherData(response.data);
        })
        .catch((err) => console.warn(err));

    // GET city data
    // cityName(searchInput)
    //   .then(({ data }) => {
    //     const cityData = data.items.map((cities) => ({
    //       cityId: cityName.id,
    //     }));
    //     console.log(cityData);

    //     return setCities(cityData);
    //   })
    //   .then(() => setCities(''))
    //   .catch((err) => console.log(err));

    // SEARCH FOR COUNTRY DATA
    if (type === 'country')
      searchCountries(searchInput)
        .then(({ data }) => {
          // console.log(data)
          // const countryData = data.items.map((country) => ({
          //   countryId: country.id,
          //   nativeName: country.volumeInfo.nativeName,
          //   name: country.volumeInfo.name || ['No country to display'],
          //   capital: country.volumeInfo.capital,
          //   currencies: country.volumeInfo.currencies,
          //   languages: country.volumeInfo.languages,

          // }));
          // console.log(countryData);
          setWeatherData({});
          return setCountries(data);
        })
        //.then(() => setCountries(''))
        .catch((err) => console.log(err));
  };

  // create function to handle saving a country to our database
  const handleSaveCountries = (countryId) => {
    console.log('hi there');
    const countryToSave = countries.find((country) => country.countryId === countryId);

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    console.log('token: ', token);

    saveCountries(countryToSave, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  const handleSaveCity = (cityId) => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    const cityData = {
      cityName: weatherData.city.name,
      countryName: weatherData.city.countryName,
      population: weatherData.city.population,
    };

    saveCity(cityData, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1 className='bucket'>🛩 Travel Bucket List 🛩</h1>
        </Container>
      </Jumbotron>

      <Container>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row className='justify-content-center'>
            <Col xs={12} md={8}>
              <Form.Control as='select' name='type' onChange={(e) => setType(e.target.value)}>
                <option value='city'>City</option>
                <option value='country'>Country</option>
              </Form.Control>
              <Form.Control
                className='search'
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='✈️  Search for a Place'
              />
            </Col>

            <Col xs={12} md={4}>
              <Button className='search' type='submit' variant='danger' size='lg'>
                Submit Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>

      <Container className='justify-content-center' style={{ marginTop: '20px' }} fluid>
        <h2 className='search'>
          {countries.length
            ? ` Viewing ${countries.length} results:`
            : Object.keys(weatherData).length
            ? 'Viewing your searched city'
            : 'Search for a Place to begin'}
        </h2>
        <CardColumns>
          {countries.map((country) => {
            return (
              <Card className='cardDisplay' key={country.countryId} border='dark'>
                {country.image ? (
                  <Card.Img src={country.image} alt={`The cover for ${country.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{country.name}</Card.Title>

                  <Card.Text className='small'>Native Name: {country.nativeName}</Card.Text>

                  <Card.Text className='small'>Capital: {country.capital} </Card.Text>

                  <Card.Text className='small'>Currencies Name: {country.currencies}</Card.Text>

                  <Card.Text className='small'>Languages Name: {country.languages}</Card.Text>
                  {userData.username && (
                    <Button className='btn-block btn-info' onClick={() => handleSaveCountries(country.countryId)}>
                      save this country
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>

      <Container>
        <CardColumns>
          {/* {cities.map((city) => { */}
          {Object.keys(weatherData).length && (
            <Card className='cardDisplay' key={weatherData.cityId} border='dark'>
              <Card.Body>
                <Card.Title>{weatherData.city.name}</Card.Title>

                <Card.Text className='small'> County: {weatherData.city.country}</Card.Text>

                <Card.Text className='small'> City Population: {weatherData.city.population}</Card.Text>

                {userData.username && (
                  <Button className='btn-block btn-info' onClick={() => handleSaveCity(weatherData.cityId)}>
                    save this city
                  </Button>
                )}
              </Card.Body>
            </Card>
          )}
        </CardColumns>
      </Container>
    </>
  );
}

export default Places;
