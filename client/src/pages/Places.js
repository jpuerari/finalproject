import React, { useState, useContext } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import SavedCountryContext from '../utils/SavedCountryContext';

import { savedCountries, searchCountries, getSavedCountries } from '../utils/API';




function Places() {
  // create state for holding returned  api data 
  const [countries, setCountries] = useState([]);
  // create styate for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const { countries: savedCountries, getSavedCountries } = useContext(SavedCountryContext);

  console.log(countries);
  console.log(savedCountries);

  const userData = useContext(UserInfoContext);


  const handleFormSubmit = event => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
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
          languages: country.volumeInfo.languages
        }));
        console.log(countryData);

        return setCountries(countryData);
      })
      .then(() => setCountries(''))
      .catch((err) => console.log(err));
  };






  // create function to handle saving a country to our database
  const handleSaveCountries = (countryId) => {

    const countryToSave = searchCountries.find((country) => country.countryId === countryId);

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }


    savedCountries(countryToSave, token) 
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
                placeholder='✈️  Search for a Place'
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

      <Container style={{ marginTop: '20px' }} fluid>
        <h2>{countries.length ? `Viewing ${countries.length} results:` : 'Search for a country to begin'}</h2>
        <CardColumns>
          {countries.map((country) => {

            return (
              <Card key={country.countryId} border='dark'>
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