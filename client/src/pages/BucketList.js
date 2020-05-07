import React, { useContext, useEffect } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';

import SavedCountryContext from '../utils/SavedCountryContext';

import UserInfoContext from '../utils/UserInfoContext';


import * as API from '../utils/API';

import AuthService from '../utils/auth';





function BucketList(){

  const userData = useContext(UserInfoContext);

  const { countries: savedCountries, getSavedCountries } = useContext(SavedCountryContext);
useEffect(()=> {
savedCountries()
.then(data => {
  console.log(data)
})

},[])
  console.log(getSavedCountries)



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteCountry = (countryId) => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
     
    if (!token) {
      return false;
    }

    API.deleteCountry(countryId, token)      
    .then(() => userData.getUserData())
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
      <h2>
          {userData.savedCountry.length
            ? `Viewing ${userData.savedCountry.length} saved ${userData.savedCountry.length === 1 ? 'country' : 'country'}:`
            : 'You have no saved countries!'}
        </h2>
        <CardColumns>
        {userData.savedCountry.map((country) => {
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