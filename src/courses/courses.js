import React, { useState } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { createProjectql } from '../mutations/mutation'
import { useMutation } from '@apollo/client'

function Course(){
    const [description,setDescription] = useState('')
    const [tittle, setTittle] = useState('')
    const [Horas, setHoras] = useState('')
    const [ProyectForm] =useMutation(createProjectql)
    const enviar= async (e)=>{
        const response = await ProyectForm(
            {
                variables:{description,tittle,Horas}
            }
        )
        console.log(response)
        if(response.data.createProject.error){
            let error = response.data.createProject.error
            let message = error.map (p => p.message)
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
                title: 'Curso Creado',
                text: 'El curso '+response.data.createProject.Project.tittle+ " se ha creado",
                showConfirmButton: false,
                timer: 2500
            })
        }
    }
    return(
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