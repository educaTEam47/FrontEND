import React from "react";
import { useState } from 'react'
import { loginql } from "../mutations/mutation";
import Swal from 'sweetalert2'
import { useMutation } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import auth from './auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [loginForm] = useMutation(loginql)
    const enviar = async (e) => {
        const response = await loginForm(
            {
                variables: { username: username, password: password },
                errorPolicy: "all"
            })
        let error = response.data.login.error
        if (error) {
            console.log(error)
            let message = error.map(p => p.message)
            console.log(message)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: username,
                showConfirmButton: false,
                timer: 1500
            })
            let token = response.data.login.token
            localStorage.setItem('token',token)
            window.location.replace('./profile');
        }
    }
    //let nombresuser = data && data.getUsers.map(p => p.nombres)
    //let apellidosuser = data && data.getUsers.map(p => p.apellidos)
    //let emailuser = data && data.getUsers.map(p => p.email)
    //let roluser = data && data.getUsers.map(p => p.rol)
    return (
        <div className="container">
            <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Iniciar Sesion</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Username"
                            onChange={e => setusername(e.target.value)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="password"
                            onChange={e => setpassword(e.target.value)}
                            aria-label="password"
                            aria-describedby="basic-addon1"
                            type="password"
                        />
                    </InputGroup>
                    <Button onClick={enviar}>Iniciar Sesion</Button>
                </Card.Body>
                {console.log(username, password)}
            </Card>
        </div>
    )
}
export default Login;