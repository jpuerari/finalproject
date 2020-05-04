import React, { useState, useContext } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import SavedCountryContext from '../utils/SavedCountryContext';

import { saveCountries, searchCountries} from '../utils/API';

import { set } from "mongoose";


function Places() {
  // create state for holding returned  api data 
  const [countries, setCountries] = useState([]);
  // create styate for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const { countries: savedCountries, getSavedCountries } = useContext(SavedCountryContext);

  console.log(savedCountries)




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

    return setCountries(countryData);
  })
  .then(() => setCountries(''))
  .catch((err) => console.log(err));
};






  // create function to handle saving a country to our database
  const handleSaveCountries = (countryId) => {
   
      const countryToSave = searchCountries.find((country) => country.countryId === countryId);

    
      saveCountries(countryToSave)
        .then(() => (getSavedCountries))
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

      </Container>
      <Container fluid>
        <h2>{countries.length ? `Viewing ${countries.length} results:` : 'Search for a country to begin'}</h2>
        <CardColumns>
          {countries.map((country) => {
  
            return (
              <Card key={country.countryId} border='dark'>
                <Card.Body>
                  <Card.Title>{country.name}</Card.Title>
                  <p className='small'>Native Name: {country.nativeName}</p>
                  <Card.Text>{country.nativeName}</Card.Text>
                 <p className='small'>Capital: {country.capital}</p>
                  <Card.Text>{country.capital}</Card.Text>
                  <p className='small'>Currencies Name: {country.currencies}</p>
                  <Card.Text>{country.currencies}</Card.Text>
                  <p className='small'>Languages Name: {country.languages}</p>
                  <Card.Text>{country.languages}</Card.Text>
                  <Button
                    disabled={savedCountries.some((savedCountries) => savedCountries.countryId === country.countryId)}
                    className='btn-block btn-info'
                    onClick={() => handleSaveCountries(country.countryId)}>
                    {savedCountries.some((savedCountries) => savedCountries.countryId === country. countryId)
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