import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import API from '../utils/API'

function Places() {
  // create state for holding returned  api data 
  const [countries, setCountries] = useState([]);
  // create styate for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    API.getCountries(searchInput)
      .then(response => {

        console.log(response.data)
        setCountries(response.data)
     
      })
      .catch(err => console.warn(err))
  }


  // create function to handle saving a country to our database
  const handleSaveCountry = (countryId) => { }
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
          <Form.Row>
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
          countries.map(c => <div>{c.name}</div>)
        }
      </Container>
    </>
  )

}

export default Places;