import React, { useState, useContext } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import SavedCountryContext from '../utils/SavedCountryContext';

import { saveCountries, searchCountries} from '../utils/API';

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
  }


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

        {
          countries.map(c => <div>{c.name}
          {c.nativeName}
          {c.capital}
          {c.currencies}
          {c.languages}</div>)
          
        }
      </Container>
    </>
  )

}

export default Places;