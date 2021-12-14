import React from "react";
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'

function Home() {
    const toLogin = () => {
        window.location.replace('./login')
    }
    const toRegister = () => {
        window.location.replace('/register')
    }

    return (
        <div className="container">
            <Card className="text-center">
                <Card.Header>Bienvenido</Card.Header>
                <Card.Body>
                    <Card.Title>Bienvenidos a EducaTEam</Card.Title>
                    <Card.Text>
                        La Nueva Experiencia educativa, registrate o ingresa con tu usuario
                    </Card.Text>
                    <Button onClick={toLogin} variant="primary" >Ingresa</Button>
                    <Button onClick={toRegister} variant="primary">Registrate</Button>
                </Card.Body>
                <Card.Footer className="text-muted">EducaTEam, de la academia a tu mesa</Card.Footer>
            </Card>
        </div>
    )
}

export default Home;