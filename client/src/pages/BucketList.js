import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, Form, Card, Button, CardColumns, Collapse } from 'react-bootstrap';

function BucketList(){
    return(
        <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>🛩 My Bucket List 🛩</h1>
        </Container>
      </Jumbotron>
      
    );
}
export default  BucketList;