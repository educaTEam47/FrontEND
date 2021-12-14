import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { createProjectql, validateql, addTeacherql } from '../mutations/mutation'
import { useMutation } from '@apollo/client'

function Course() {

    const [description, setDescription] = useState('')
    const [tittle, setTittle] = useState('')
    const [Horas, setHoras] = useState('')
    const [ProyectForm] = useMutation(createProjectql)
    const [idProject, setidProject] = useState("")
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")

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
    const [addTeacher] = useMutation(addTeacherql)
    const response = async () => {
        const response1 = await validateForm(
            {
                variables: { token: tokenStorage }
            }
        )
        console.log(response1)
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
                if (response1.data.validate.rol === "Lider") {
                    setAuto(response1.data.validate.Estado)
                    setEmail(response1.data.validate.email)
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


    const enviar = async (e) => {
        if (auto === "Activar") {
            const response = await ProyectForm(
                {
                    variables: { email,description, tittle, Horas }
                }
            )
            console.log(response)
            if (response.data.createProject.error) {
                let error = response.data.createProject.error
                let message = error.map(p => p.message)
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
                    title: 'Curso Creado',
                    text: 'El curso ' + response.data.createProject.Project.tittle + " se ha creado",
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        }
        else{
            Swal.fire({
                title:"Error!",
                text:"No tiene autorizacion",
                icon:"error"
            })
        }

    }
    return (
        <div className="container">
            <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Proyecto</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Nombre del Proyecto"
                            onChange={e => setTittle(e.target.value)}
                            aria-label="project"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Descripcion"
                            onChange={e => setDescription(e.target.value)}
                            aria-label="tittle"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Horas"
                            onChange={e => setHoras(e.target.value)}
                            aria-label="Horas"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Button onClick={enviar}>Crear Proyecto</Button>
                </Card.Body>
            </Card>
        </div>
    )

}
export default Course;