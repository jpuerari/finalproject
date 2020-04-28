import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, Container } from 'react-bootstrap';


function AppNavbar(){
    return(
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          Travel Bucket List
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/Places'>Search Places</Nav.Link>
              <Nav.Link as={Link} to='/BucketList'>My BucketList</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}


export default AppNavbar;