import React from "react";
import { useState, useEffect } from 'react'
import { updateProjectql, delTeacherql, addTeacherql, addStudentql, delStudentql } from '../mutations/mutation';
import { getCourseql } from '../queries/queries'
import Swal from 'sweetalert2'
import { useMutation, useQuery } from '@apollo/client'
import { Card, InputGroup, FormControl, Button, FloatingLabel, Form, Dropdown, Table } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Cookies from "universal-cookie";
import '../courses/courseAdmi.css'

function EditProjectTeacher() {
    const cookies = new Cookies();
    const id = cookies.get('edit-Course')
    console.log(id)

    const { data } = useQuery(getCourseql, {
        variables: { id }
    })

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [Horas, setHoras] = useState('')
    const [people, setPeople] = useState([])
    useEffect(() => {
        if (data.getProject._id) {
            setTitle(data.getProject.title)
            setDescription(data.getProject.description)
            setHoras(data.getProject.Horas)
            setPeople(data.getProject.people)
        }
    }, [data])
    console.log(data)


    return (
        <div className="container">
            <Card className="text-center" style={{ width: '20rem' }}>
                <Card.Body className="card-body">
                    <Card.Title className="tittle">Informacion del Curso</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Id Course"
                            disabled value={id}
                            aria-label="Id Course"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Titulo"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            aria-label="Titulo"
                            aria-describedby="basic-addon1"
                        />
                        <FloatingLabel controlId="floatingTextarea2" label="Descripcion">
                            <Form.Control
                                as="textarea"
                                value={description}
                                placeholder="Leave a comment here"
                                onChange={e => setDescription(e.target.value)}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Horas"
                            type="number"
                            value={Horas}
                            onChange={e => setHoras(e.target.value)}
                            aria-label="Horas"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Button >Actualizar Datos</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
export default EditProjectTeacher