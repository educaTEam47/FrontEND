import React from "react";
import { useState } from 'react'
import Swal from 'sweetalert2'
import { registerql } from '../mutations/mutation'
import { useMutation } from '@apollo/client'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [nombres, setnombres] = useState('')
    const [apellidos, setapellidos] = useState('')
    const [rol, setrol] = useState('')
    const [registerForm] = useMutation(registerql)

    const enviar = async (e) =>{
        const response = await registerForm(
            {
                variables:{username,password,email,nombres,apellidos,rol},
                errorPolicy:"all"
            })
        console.log(response)
        let error=response.data.registro.error
        if (error){
            console.log(error)
            let message= error.map(p => p.message)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                showConfirmButton: false,
                timer: 1500
            })
        }
        else{
            Swal.fire({
                icon: 'success',
                title: 'Por favor inicie sesion',
                text: username,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className="container">
            <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Registro</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Nombres"
                            onChange={e => setnombres(e.target.value)}
                            aria-label="Nombres"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Apellidos"
                            onChange={e => setapellidos(e.target.value)}
                            aria-label="Apellidos"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
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
                            placeholder="Email"
                            onChange={e => setemail(e.target.value)}
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Password"
                            onChange={e => setpassword(e.target.value)}
                            aria-label="Password"
                            type="password"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl 
                        aria-label="Text input with dropdown button"
                        disabled value={rol} 
                        />
                        <DropdownButton
                            variant="outline-secondary"
                            placeholder="Rol"
                            title="Rol"
                            id="input-group-dropdown-2"
                            align="end"
                        >
                            <Dropdown.Item onClick={e => setrol(e.target.value="Estudiante")}>Estudiante</Dropdown.Item>
                            <Dropdown.Item onClick={e => setrol(e.target.value="Lider")}>Lider</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                    <Button onClick={enviar}>Registrarse</Button>
                </Card.Body>
                {console.log(username, password,rol)}
            </Card>
        </div>
    )
}
export default Register;