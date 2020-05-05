import React, { useContext, useEffect } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import SavedCountryContext from '../utils/SavedCountryContext';

import * as API from '../utils/API';

import { savedCountries, searchCountries, getSavedCountries} from '../utils/API';




function BucketList(){
  const { countries: savedCountries, getSavedCountries } = useContext(SavedCountryContext);
useEffect(()=> {
savedCountries()
.then(data => {
  console.log(data)
})

},[])
  console.log(getSavedCountries)



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteCountry = (mongoId) => {
    API.deleteCountry(mongoId)
      .then(() => getSavedCountries ())
      .catch((err) => console.log(err));
  };




    return(
      

       <>
       <Navbar />
       <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>🛩 My Bucket List 🛩</h1>
        </Container>
      </Jumbotron>
        
      <Container fluid>
        <CardColumns>
          {savedCountries.map((country) => {
            return (
              <Card key={country._id} border='dark'>
               <Card.Body>
               <Card.Title>{country.title}</Card.Title>
                  <p className='small'>Native Name: {country.nativeName}</p>
                  <Card.Text>{country.capital}
                  {country.currencies}{country.languages}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteCountry(country._id)}>
                    Delete this Place!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        </Container>
  
      </>
    );
}

export default  BucketList;