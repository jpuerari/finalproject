import React, { useState, useContext } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import SavedCountryContext from '../utils/SavedCountryContext';

import { savedCountries, searchCountries, getSavedCountries, openWeather, cityName, getPhoto } from '../utils/API';

import SavedCityContext from '../utils/SavedCityContext';

function Places() {
  // create state for holding returned  api data 
  const [countries, setCountries] = useState([]);
   // create state to hold returned api data for cityName function
   const [cities, setCities] = useState([]);
    // create state for storing and setting photo URL from google photos api
  const [locationPhoto, setLocationPhoto] = useState('');
    // create state to hold weather and set weather data
    const [weatherData, setWeatherData] = useState([]);

  // create styate for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const { countries: savedCountries, getSavedCountries } = useContext(SavedCountryContext);

  const { cities: savedCities, getSavedCities } = useContext(SavedCityContext);

  console.log(cities);
  console.log(savedCities);

  console.log(countries);
  console.log(savedCountries);

  const userData = useContext(UserInfoContext);
  

  const handleFormSubmit = event => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    // GET API.getPhoto(searchInput) here

    // RUN THIS FROM HANDLE FORM SUBMIT FUNCTION IN COMPONENT
getPhoto(searchInput)
.then(({data}) => {
  const photoReference = data.result.photos[0].photo_reference;
  // set photoReference to state
  console.log(data);
  const photoUrl = `http://maps.googleapis.com/maps/api/place/photo?key=AIzaSyCjVZg684VufdZZzAGT3XAjvB8rL2OWODU
  &photoreference=${photoReference}&maxwidth=1000`
  console.log(photoReference);
  setLocationPhoto(photoUrl)
})
.catch((err) => {
  console.log(err);
})








    // GET weatherdata through openWeather
    // openWeather(searchInput).then().catch()
    openWeather(searchInput)
        .then(response => {
          console.log(response.data)
          setWeatherData(response.data)
        })
        .catch(err => console.warn(err))

    // GET city data
    // cityName(searchInput).then().catch()
    cityName(searchInput)
        .then(response => {
          console.log(response.data)
          setCities(response.data)
         })
         .catch(err => console.warn(err))

         cityName(searchInput)
         .then(({ data }) => {
           const cityData = data.items.map((cities) => ({
            cityId: cityName.id,
           }));
           console.log(cityData);
   
           return setCities(cityData);
         })
         .then(() => setCities(''))
         .catch((err) => console.log(err));



         


    // SEARCH FOR COUNTRY DATA

    searchCountries(searchInput)
      .then(response => {

        console.log(response.data)
        setCountries(response.data)

      })
      .catch(err => console.warn(err))


    searchCountries(searchInput)
      .then(({ data }) => {
        const countryData = data.items.map((country) => ({
          countryId: country.id,
          nativeName: country.volumeInfo.nativeName,
          name: country.volumeInfo.name || ['No country to display'],
          capital: country.volumeInfo.capital,
          currencies: country.volumeInfo.currencies,
          languages: country.volumeInfo.languages,
          
        }));
        console.log(countryData);

        return setCountries(countryData);
      })
      .then(() => setCountries(''))
      .catch((err) => console.log(err));
  };






  // create function to handle saving a country to our database
  const handleSaveCountries = (countryId) => {
    console.log(searchCountries);
    const countryToSave = countries.find((country) => country.countryId === countryId);

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }


    savedCountries(countryToSave, token) 
    .then(() => userData.getUserData())
    .catch((err) => console.log(err));
  };

  const handleSaveCity= (cityId) => {

    const cityToSave = cityName.find((city) => city.cityId === cityId);

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }


    cityName(cityToSave, token) 
    .then(() => userData.getUserData())
    .catch((err) => console.log(err));
  };
  // find the country in `searchedCountries` state by the matching id


  // send the country data to our api





  return (
    <>
      <Navbar />
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>🛩 Travel Bucket List 🛩</h1>
          {console.log("userData: ", userData)}
        </Container>
      </Jumbotron>

      <Container>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row className='justify-content-center'>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='✈️  Search for a Country'
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type='submit' variant='danger' size='lg'>
                Submit Search
                  </Button>
            </Col>
          </Form.Row>
        </Form>


        {/* i hope i put this in the right place lol -josh */}



        {/* i hope i put this in the right place lol -josh */}


        </Container>


      <Container className='justify-content-center' style={{ marginTop: '20px' }} fluid>
        <h2 >{countries.length ? ` Viewing ${countries.length} results:` : 'Search for a Place to begin'}</h2>
        <CardColumns>
          {countries.map((country) => {

            return (
              <Card key={country.countryId} border='dark' >
                {country.image ? <Card.Img src={country.image} alt={`The cover for ${country.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{country.name}</Card.Title>

                  <Card.Text className='small'>Native Name: {country.nativeName}</Card.Text>

                  <Card.Text className='small'>Capital: {country.capital} </Card.Text>

                  <Card.Text className='small'>Currencies Name: {country.currencies}</Card.Text>

                  <Card.Text className='small'>Languages Name: {country.languages}</Card.Text>
                 
                    <Button
                    disabled={userData.savedCountry?.some((savedCountry) => savedCountry.countryId === country.countryId)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveCountries(country.countryId)}>
                    {userData.savedCountry?.some((savedCountry) => savedCountry.countryId === country.countryId)
                      ? 'This country has already been saved!'
                      : 'Save this country!'}
                    </Button>
                    
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>


    

      </>
  )

}

export default Places;