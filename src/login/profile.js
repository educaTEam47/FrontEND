import React from "react";
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

function Profile() {
  

    return (
        <div className="container">
          <Card className="text-center">
          <Card.Header>Bienvenido Usuario</Card.Header>
          <Card.Body>
          <Card.Title>Bienvenidos a EducaTEam</Card.Title>
          <Card.Text>
          Pagina PlaceHolder para login Exitoso
           </Card.Text>
           
            </Card.Body>
       <Card.Footer className="text-muted">EducaTEam, de la academia a tu mesa</Card.Footer>
</Card>
        </div>
    )
}

export default Profile;