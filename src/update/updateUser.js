import React from "react";
import { useState, useEffect } from 'react'
import { updateUserql, validateql } from '../mutations/mutation';
import { getUserql } from '../queries/queries'
import Swal from 'sweetalert2'
import { useMutation, useQuery } from '@apollo/client'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateUser() {
    const [nombres, setnombres] = useState('')
    const [apellidos, setapellidos] = useState('')
    const [identificacion, setidentificacion] = useState('')
    const [numIdentificacion, setnumIdentificacion] = useState('')
    const [Carrera, setCarrera] = useState('')
    const [email, setemail] = useState('')
    const cookies = new Cookies();
    const emailCookie = cookies.get('edit-User')

    //----------------------------------------------------------------------------------------------------------------
    let tokenStorage = localStorage.getItem('token')
    useEffect(() => {
        if (!tokenStorage) {
            tokenStorage = ""
        }
    }, [])
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        response()
    }, [])
    const [validateForm] = useMutation(validateql)
    const response = async () => {
        const response1 = await validateForm(
            {
                variables: { token: tokenStorage }
            }
        )
        //console.log(response1)
        if (response1) {
            if (response1.data.validate.error) {
                let message = response1.data.validate.error.map(p => p.message)
                Swal.fire({
                    title: "Error",
                    text: message,
                    icon: "warning"
                })
                window.location.replace('./')
            }
            else {
                if (response1.data.validate.rol === "Lider" || response1.data.validate.rol === "Estudiante" || response1.data.validate.rol === "Admi") {
                    setAuth(response1.data.validate.validacion)
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "No tiene acceso permitido",
                        icon: "error"
                    })
                    window.location.replace('./')
                }
            }
        }
    }
    //################################################################################################################


    const { data } = useQuery(getUserql,
        {
            variables: { email }
        });
    useEffect(() => {
        if (auth === true) {
            if (emailCookie !== "" || emailCookie) {
                setemail(emailCookie)
                if (email !== '' || email) {
                    if (data) {
                        if (data.getUser) {
                            if (data.getUser.user) {
                                setnombres(data.getUser.user.nombres)
                                setapellidos(data.getUser.user.apellidos)
                                setidentificacion(data.getUser.user.identificacion)
                                setnumIdentificacion(data.getUser.user.numIdentificacion)
                                setCarrera(data.getUser.user.Carrera)
                            }
                        }
                    }
                }
            }
        }
    }, [data])
    console.log(data)
    //console.log(token)
    const [updateForm] = useMutation(updateUserql)

    const enviar = async () => {
        const response = await updateForm(
            {
                variables: { email, nombres, apellidos, identificacion, numIdentificacion, Carrera },
                errorPolicy: "all"
            })
        console.log(response)
        if (response) {
            if (response.data.updateUser.error) {
                let error = response.data.updateUser.error
                let message = error.map(p => p.message)
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: message + " todos los demas datos si se actualizaron",
                    showConfirmButton: false,
                    timer: 2500
                })
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizacion',
                    text: 'Se han actualizado los datos satisfactoriamente',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        }

    }
    return (
        <div className="container">
            <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Actualizar Datos</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="email user"
                            disabled value={email}
                            aria-label="email user"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Nombres"
                            value={nombres}
                            onChange={e => setnombres(e.target.value)}
                            aria-label="Nombres"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Apellidos"
                            value={apellidos}
                            onChange={e => setapellidos(e.target.value)}
                            aria-label="Apellidos"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Identificacion"
                            value={identificacion}
                        />
                        <DropdownButton
                            variant="outline-secondary"
                            placeholder="Tipo"
                            title="Tipo"
                            id="input-group-dropdown-2"
                            align="end"
                        >
                            <Dropdown.Item onClick={e => setidentificacion(e.target.value = "Cedula de Ciudadania")}>Cedula de Ciudadania</Dropdown.Item>
                            <Dropdown.Item onClick={e => setidentificacion(e.target.value = "Tarjeta de Identidad")}>Tarjeta de Identidad</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Numero de Documento"
                            type="number"
                            value={numIdentificacion}
                            onChange={e => setnumIdentificacion(e.target.value)}
                            aria-label="Numero de Documento"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Carrera"
                            value={Carrera}
                            onChange={e => setCarrera(e.target.value)}
                            aria-label="Carrera"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Button onClick={enviar}>Actualizar Datos</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
export default UpdateUser;