import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserql } from '../queries/queries'
import { Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2'

function GetUser() {
    const [id, setid] = useState('')
    const [nombres, setnombres] = useState('')
    const [apellidos, setapellidos] = useState('')
    const [email, setemail] = useState('')
    const [rol, setrol] = useState('')
    var [Email,setEmail]=useState('');
    const { data, loading } = useQuery(getUserql,
        {
            variables: { Email },
        });
    //console.log(data)
    const validar = () => {
        if (!email) {
            if (data) {
                let error = data.getUserByEmail.error
                if(error){
                    let message = error.map(p => p.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setnombres('')
                    setapellidos('')
                    setemail('')
                    setrol('')
                }
                else{
                    setnombres(data.getUserByEmail.user.nombres)
                    setapellidos(data.getUserByEmail.user.apellidos)
                    setemail(data.getUserByEmail.user.email)
                    setrol(data.getUserByEmail.user.rol)
                } 
            }
        }
        else {
            let message="El email del usuario no puede estar vacio / Usuario no existe"
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    //placeholder="Identificacion"
    //disabled value={identificacion}
    return (
        <div className="container">
            <Card className="text-center" style={{ width: '25rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Buscar Usuario</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Correo Del Usuario"
                            onChange={e => setEmail(e.target.value)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Nombres"
                            disabled value="Nombres"
                        />
                        <FormControl
                            placeholder="Nombres"
                            disabled value={nombres}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Apellidos"
                            disabled value="Apellidos"
                        />
                        <FormControl
                            placeholder="Apellidos"
                            disabled value={apellidos}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Email"
                            disabled value="Email"
                        />
                        <FormControl
                            placeholder="Email"
                            disabled value={email}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="rol"
                            disabled value="Rol"
                        />
                        <FormControl
                            placeholder="rol"
                            disabled value={rol}
                        />
                    </InputGroup>
                    <Button onClick={validar}>Buscar</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
export default GetUser;