import React, { useContext, useEffect } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';
import Navbar from '../components/Navbar';



import UserInfoContext from '../utils/UserInfoContext';


import * as API from '../utils/API';

import AuthService from '../utils/auth';





function BucketList() {

  const userData = useContext(UserInfoContext);



  console.log(userData)



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteCountry = (countryId) => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    console.log(countryId)
    if (!token) {
      console.log("no token")
      return false;
    }
    console.log(token)
    API.deleteCountry(countryId, token)
    // upon succes, update user data to reflect place change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  const handleDeleteCity = (cityId) => {

    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    console.log(cityId)
    if (!token) {
      console.log("no token")
      return false;
    }
    console.log(token)
    API.deleteCity(cityId, token)
    // upon succes, update user data to reflect place change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };



  return (


    <>
      <Navbar />
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1 className='bucket'>🛩 My Bucket List 🛩</h1>
        </Container>
      </Jumbotron>

      <Container fluid>
        <h2 className='search'>
          {userData.savedPlaces.length
            ? `Viewing ${userData.savedPlaces.length} saved ${userData.savedPlaces.length === 1 ? 'Places' : 'Places'}:`
            : 'You have no saved Places!'}
        </h2>
        <CardColumns>
          {userData.savedPlaces.map((country) => {
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

        <CardColumns>
          {userData.savedCities.map((city) => {
            return (
              <Card key={city._id} border='dark'>
                <Card.Body>
                  <Card.Title>Name:{city.cityName}</Card.Title>
                 
                  <Card.Text>City Population:{city.population}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteCity(city._id)}>
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

export default BucketList;